import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI ?? '');
    console.log(`MongoDB connected :${connection.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
