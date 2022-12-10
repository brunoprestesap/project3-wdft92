import mongoose from "mongoose";

<<<<<<< HEAD
async function dbConnect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Server connected to data base named: ${dbConnection.connection.name}`);
=======
async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to data base: ${dbConnection.connection.name}`);
>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2
  } catch (error) {
    console.log(error);
  }
}

<<<<<<< HEAD
export default dbConnect;
=======
export default connect;
>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2
