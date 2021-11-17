import { Schema } from 'mongoose';
export const userSchema = new Schema({
  _id: { type: String, required: true }, // 覆盖 Mongoose 生成的默认 _id
  userName: { type: String, required: true },
  password: { type: String, required: true },
});
