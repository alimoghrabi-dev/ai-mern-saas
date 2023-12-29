import User from "../models/user.model.js";
import { configureOpenAI } from "../config/openai.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        // @ts-ignore
        user.chats.push({ content: message, role: "user" });
        // send all chats with new one to openAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // @ts-ignore
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export async function sendChatsToUser(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
export async function deleteUserChat(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        user.chats = [];
        await user.save();
        return res.status(200).send("OK");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
//# sourceMappingURL=chat.controllers.js.map