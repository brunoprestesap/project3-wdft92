import mongoose from "mongoose";

async function dbConnect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Server connected to data base named: ${dbConnection.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;