import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv"

dotenv.config()

<<<<<<< HEAD
=======

>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2
export default expressjwt({
    secret: process.env.TOKEN_SIGN_SECRET,
    algorithms: ["HS256"]
})

<<<<<<< HEAD

=======
>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2
// quando esse a requisição passar por esse middleware 
// será criado uma chave chamada: req.auth -> payload -> email, _id, role