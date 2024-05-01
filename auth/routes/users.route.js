import express from 'express';
import getUsers from '../controllers/users.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const usersRouter = express.Router();

usersRouter.get('/', verifyToken, getUsers);

export default usersRouter;