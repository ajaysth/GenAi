import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import blacklistTokenModel from '../models/blacklistModel.js';


//register controller
const register = async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the data"
        })
    }

    try {
        const isUserAlreadyRegistered = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyRegistered) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with email address or username"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        const token = jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token)
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id: user._id,
                username:user.username,
                email:user.email
            }
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
        success:false,
        message:"Server error in register",
        error: err.message
    })
    }
}

//login controller
const login = async (req,res)=>{
    const {email,password} = req.body

    if (!email || !password){
        return res.status(400).json({
            success:false,
            message:"Enter all credentials"
        })
    }

    try{

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found please signup"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }

        const token = jwt.sign(
            {id:user._id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token)
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                id: user._id,
                username:user.username,
                email:user.email
            }
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
        success:false,
        message:"Server error in login",
        error: err.message
    })
    }
}


const logout = async (req,res)=>{
    const token = req.cookies.token
    if(token){
        await blacklistTokenModel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        success:true,
        message:"Loggout Successfully"
    })
}

 
const getMe = async (req,res)=>{

    const id = req.user.id

    const user = await userModel.findById(id)

    if(!user){
        
        return res.status(400).json({
            success:false,
            message:"user not found from getme",
            id:id
    })
    }

    res.status(200).json({
        success:true,
        message:"User found",
        user:user
    })
}

export { register, login, logout, getMe }