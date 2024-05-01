import mongoose from 'mongoose';

const connectToMongoDB = async() => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MONGODB');
	} catch (error) {
		console.log('Error Connecting to MONGO_DB ', error.message);
	}
};

export default connectToMongoDB;
