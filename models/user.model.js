import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // retira os espaços do e-mail
    lowercase: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  active: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default:
      "https://res.cloudinary.com/die2rduds/image/upload/v1670509301/ironrh-gallery/profile-picture_lbhtd4.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
  },
  department: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Disponível", "Alocado", "De Férias", "De Licença", "Produto"],
  },
  birthDate: {
    type: Date,
  },
  admissionDate: {
    type: Date,
  },
  resignationDate: {
    type: Date,
  },
  address: {
    city: { type: String },
    state: { type: String },
  },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  passwordHash: { type: String, required: true },
  profilePic: { type: String },
  confirmEmail: { type: Boolean, default: false },
},
{
  timestamps: true,
});

const UserModel = model("User", userSchema);

export default UserModel;
