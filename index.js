//The Main File
import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRoute from "./routes/user.routes.js";

//Enable server to have environment variables .env
dotenv.config();

//Instantiate the variable  -> app
const app = express();


//Configure the server to send and receive files in JSON
app.use(express.json());

//conectando com o banco de dados
dbConnect();

// Rotas - middlewares
// At a postman wil be -> 8080/user/register
app.use("/user", userRoute);
// app.use('/cidadao', cidadaoRoute);
// app.use('/registro', registroRoute);

// Server will Up 

app.listen(process.env.PORT, () => {
  console.log(
    `App UP and running on port http://localhost:${process.env.PORT}`
  );
});