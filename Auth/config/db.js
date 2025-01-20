import mongoose from "mongoose";
// Function for Creating Connection to Database
const connectDB = async () => {
	try {
        mongoose.set('strictQuery', true);
		await mongoose.connect(process.env.MONGO_URL);
		console.log(`MongoDB Connected Successfully!`);
	} catch (err) {
		console.log(err);
	}
};

export default connectDB;