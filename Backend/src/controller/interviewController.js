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

export { generateInterviewReportController };