import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials:true
})


const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }: { resumeFile: File; selfDescription: string; jobDescription: string }) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);  
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);
    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const getInterviewReportById = async (id: string) => {
    const response = await api.get(`/api/interview/${id}`);
    return response.data;
};

const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview");
    return response.data;
};

export { generateInterviewReport, getInterviewReportById, getAllInterviewReports };