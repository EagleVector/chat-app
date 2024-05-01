import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import usersRouter from './routes/users.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000'
	})
);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
	res.send('Auth Page');
});

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Auth Server listening on http://localhost:${PORT}`);
});
