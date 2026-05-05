import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReportmodel.js";

// ✅ Import
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfModule = require("pdf-parse");

const generateInterviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ 
                success: false, 
                message: "Resume file is required" 
            });
        }

        if (!resumeFile.mimetype?.includes("pdf")) {
            return res.status(400).json({ 
                success: false, 
                message: "Only PDF files are allowed" 
            });
        }

        // ✅ Convert Buffer to Uint8Array (Important fix)
        const uint8Array = new Uint8Array(resumeFile.buffer);

        // Parse PDF
        const pdfParser = new pdfModule.PDFParse(uint8Array);
        const pdfData = await pdfParser.getText();
        
        const resumeContent = pdfData.text || "";

        if (!resumeContent || resumeContent.trim().length === 0) {
            return res.status(422).json({
                success: false,
                message: "Could not extract text from the uploaded PDF"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user?.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Error in generateInterviewReportController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while generating interview report",
            error: error.message
        });
    }
};

const getInterviewReportBytIdController = async (req, res) => {
    const {interviewId} = req.params

    try{

        const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user?.id})

        if(!interviewReport){
            return res.status(400).json({
                success:false,
                message:"Report not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Report found",
            interviewReport
        })

    }catch(error){
        console.error("Error in getInterviewReportBytIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while getting interview report",
            error: error.message
        });
    }
}


const getAllInterviewReportController = async (req, res) => {

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


export { generateInterviewReportController, getInterviewReportBytIdController, getAllInterviewReportController };