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
  }
}

export default attachCurrentUser;
