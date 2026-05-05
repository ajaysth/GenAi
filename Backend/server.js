import "dotenv/config"
import app from "./src/app.js"
import connectDb from "./src/config/database.js"
import generateInterviewReport from "./src/services/ai.service.js"
import { resume,jobDescription,selfDescription } from "./src/services/temp.js"

const PORT = process.env.PORT || 5000


app.get("/",(req,res)=>{
    res.json({
        message:"Hello from server"
    })
})

connectDb()

// await generateInterviewReport({resume,jobDescription,selfDescription})



app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})