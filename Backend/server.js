import app from "./src/app.js"
import "dotenv/config"
import connectDb from "./src/config/database.js"

const PORT = process.env.PORT || 5000


app.get("/",(req,res)=>{
    res.json({
        message:"Hello from server"
    })
})

connectDb()
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})