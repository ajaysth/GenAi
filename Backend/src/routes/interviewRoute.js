import express from "express"
import authUser from "../middlewares/authMiddleware.js"
import { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController } from "../controller/interviewController.js"
import upload from "../middlewares/fileMiddleware.js"


const interviewRouter = express.Router()

interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewReportController)
interviewRouter.get("/:interviewId",authUser,getInterviewReportByIdController)
interviewRouter.get("/",authUser,getAllInterviewReportController)




export default interviewRouter