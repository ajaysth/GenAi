import express from "express"
import authUser from "../middlewares/authMiddleware.js"
import { generateInterviewReportController, getInterviewReportBytIdController } from "../controller/interviewController.js"
import upload from "../middlewares/fileMiddleware.js"


const interviewRouter = express.Router()

interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewReportController)
interviewRouter.get("/report/:interviewId",authUser,getInterviewReportBytIdController)
interviewRouter.get("/",authUser,getInterviewReportBytIdController)




export default interviewRouter