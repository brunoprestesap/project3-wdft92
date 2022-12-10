<<<<<<< HEAD
async function attachCurrentUser(request, response, next) {
  try {
    const loggedUser = request.auth;

    // Encontrar o usuário através do loggedUser (token)
    const user = await UserModel.findOne({
      _id: loggedUser._id,
    });

    // Se o usuário existe ou não
    if (!user) {
      return response.status(400).json({ msg: "User not found" });
    }

    // Encontrou o usuário, existe no db e é o user atual.
    request.currentUser = user;

    // Seque repassando a requisição com o método next (middleware).

    next();
  } catch (error) {
    return response.status(500).json("Something got wrong!", error);
=======
import UserModel from "../model/user.model.js";

//middleware
async function attachCurrentUser(req, res, next) {
  try {
    const userData = req.auth; // -> _id, email, role

    const user = await UserModel.findById(userData._id, { passwordHash: 0 });

    //confirmar se o user existe
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    //checar se o usuário tem o email confirmado
    if (user.confirmEmail === false) {
      return res
        .status(401)
        .json({ msg: "Usuário não confirmado. Por favor validar email." });
    }

    //eu posso criar CHAVES dentro dessa requisição
    req.currentUser = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2
  }
}

export default attachCurrentUser;
