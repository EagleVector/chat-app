import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		res.status(401).json({ message: 'Unauthorized Access' });
	}

	try {
		// Verify Token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized Access' });
	}
};

export default verifyToken;