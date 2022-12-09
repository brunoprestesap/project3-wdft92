import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import generateToken from "./../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js"

const userRoute = express.Router();
const saltRounds = 10;

// Cadastro do Usuário - CREATE

userRoute.post("/register", async (request, response) => {
  try {
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({ msg: "Password not entered" });
    }

    // Pedindo para o bcrypt fazer a String da senha com as voltas setadas (rounds = 10).
    const saltString = await bcrypt.genSalt(saltRounds);

    // Criar o HASH da senha (senha informada do usuário + os saltos aleatórios)
    const hashPassword = await bcrypt.hash(password, saltString);

    // Capturando a senha do usuario e criptografando
    const user = await UserModel.create({
      ...request.body,
      password: hashPassword,
    });

    // Exclui a visualização da senha no momento do return.
    delete user._doc.password;

    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Register process got wrong" });
  }
});

// Rota de Login -> To sign In (CREATE A TOKEN)

userRoute.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body; // desconstrução pelo email e senha

    // lets to find the user
    const user = await UserModel.findOne({ email: email });

    // Check if user exists!
    if (!user) {
      return response
        .status(400)
        .json({ msg: "Email or password not registered!" });
    }

    // To compare the passwords (entered and password into db)

    if (await bcrypt.compare(password, user.password)) {
      delete user._doc.password;
      const token = generateToken(user); // Criar a assinatura.

      //Will be show in front end

      return response.status(200).json({
        user: { ...user._doc },
        token: token
      });
    } else {
      return response.status(401).json({ msg: "Invalid email or password!" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Something got wrong! Try again!" });
  }
});

// Rota GET - Logged user - READ
userRoute.get("/profile", isAuth, attachCurrentUser, async (request, response) => {
  try {
    const loggedUser = request.currentUser;

    //Check if user is Sign on
    if (!loggedUser) {
      return response.status(404).json({ msg: "User not found!" });
    }

    const user = await UserModel.findById(loggedUser._id);

    // Remove user info securities
    delete user._doc.password;

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ msg: "Something got wrong" });
  }
});

export default userRoute;
