import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";
const chatSchema = new Schema({
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
const userSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map