import express from 'express';
import { handleRegister, handleLogin, handleGetUserDataById } from '../controllers/authController.js';
import validInfo from '../middleware/validInfo.js';

const router = express.Router();

router.post("/register", validInfo, handleRegister);
router.post("/login", validInfo, handleLogin);
router.get("/user/:userId", handleGetUserDataById);

export default router;
