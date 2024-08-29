import express from "express";
import { login, getUser,forgotpassword } from "../controllers/authControllers.js";
import jwt from "jsonwebtoken";

const router = express.Router();
//login route
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);

//protrcted route to get user info
router.get("/me", authenticateToken, getUser);

//middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
export default router;
