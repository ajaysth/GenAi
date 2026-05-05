import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


// import all routes heree
import authRouter from "./routes/authRoute.js"
import interviewRouter from "./routes/interviewRoute.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// use all routes
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)



export default app

