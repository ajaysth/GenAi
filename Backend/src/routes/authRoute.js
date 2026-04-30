import express from "express"
import { login, register, logout, getMe } from "../controller/authController.js"
import authUser from "../middlewares/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

//private route
authRouter.get("/getme",authUser,getMe)


export default authRouter