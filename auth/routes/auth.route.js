import express from 'express';
import signup, { login } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Sign Up
authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;
