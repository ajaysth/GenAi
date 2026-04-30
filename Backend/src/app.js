import express from "express"
import cookieParser from "cookie-parser"


// import all routes heree
import authRouter from "./routes/authRoute.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

// use all routes
app.use("/api/auth",authRouter)



export default app

