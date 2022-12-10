<<<<<<< HEAD
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const { _id, name, email, role } = user;
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "16h";

  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
};
=======
import jwt from 'jsonwebtoken';

function generateToken(user) {
  //user => é o usuário para quem eu vou criar essse token
  //user => que vem do seu banco de dados

  const { _id, email, role } = user; // ---> payload

  //signature -> a assinatura que prova que foi essa aplicação que criou o token.
  const signature = process.env.TOKEN_SIGN_SECRET;

  //expiration define por quanto tempo o token será válido
  const expiration = '120h';

  //essa função vai retornar o token assinado.
  //argumentos da função sign()
  //1º payload : quais as informações que vamos guardar DENTRO do token
  //2º assinatura : signature
  //3º config : determino a expiração do token
  return jwt.sign({ _id, email, role }, signature, { expiresIn: expiration });
}
>>>>>>> 49e0753ea46944b5b1c0b02a21acc7de791835f2

export default generateToken;
