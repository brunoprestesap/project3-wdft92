import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // retira os espaços do e-mail
    lowercase: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["usuário", "Admin"],
    default: "usuário",
  },
});

const UserModel = model("User", userSchema);

export default UserModel;
