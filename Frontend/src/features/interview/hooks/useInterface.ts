import {generateInterviewReport, getInterviewReportById, getAllInterviewReports} from "../services/interview.api"
import { useContext, useEffect } from 'react';

import InterviewContext from '../interview-context/interviewContext';
import { useParams } from "react-router";
export const useInterview = () => {

    const context = useContext(InterviewContext)


    if(!context) {
        throw new Error("useInterview must be used inside InterviewProvider");
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const {interviewId} = useParams()


    const generateReport =async ({jobDescription, resumeFile, selfDescription}: {jobDescription: string; resumeFile: File; selfDescription: string}) => {
        try{
            setLoading(true)
            const response = await generateInterviewReport({jobDescription, resumeFile, selfDescription})
            setReport(response.interviewReport)
            setReports(prev => [response.interviewReport, ...prev])
            return response.interviewReport
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    const getReportById =async (interviewId: string) => {
        try{
            setLoading(true)
            setReport(null) // Clear stale data
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    const getAllReports = async () => {
        try{
            setLoading(true)
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(interviewId){
            getReportById(interviewId)
        }else{
            getAllReports()
        }
    },[interviewId])


    return {
        loading,
        setLoading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    }


    
}