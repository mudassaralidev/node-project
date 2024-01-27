import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoBD Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error Occurred while connecting to DB: ${err}`)
  }
}

export default connectDB;