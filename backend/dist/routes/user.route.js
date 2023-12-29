import { Router } from "express";
import { getAllUsers, userSignUp, userSignIn, verifyUser, userLogout, } from "../controllers/user.controllers.js";
import { signUpValidator, signInValidator, validate, } from "../utils/validators.js";
import { verifyToken } from "../utils/token.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignUp);
userRoutes.post("/signin", validate(signInValidator), userSignIn);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user.route.js.map