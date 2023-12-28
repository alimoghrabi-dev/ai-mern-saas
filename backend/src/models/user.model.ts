import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";

interface IChat {
  id: string;
  role: string;
  content: string;
}

const chatSchema = new Schema<IChat>({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

interface IUser {
  name: string;
  email: string;
  password: string;
  chats: IChat[] | [];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    chats: [chatSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
