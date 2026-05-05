import express from "express"
import authUser from "../middlewares/authMiddleware.js"
import { generateInterviewReportController } from "../controller/interviewController.js"
import upload from "../middlewares/fileMiddleware.js"


const interviewRouter = express.Router()

interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewReportController)


export default interviewRouter