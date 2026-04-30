import jwt from 'jsonwebtoken'
import blacklistTokenModel from '../models/blacklistModel.js'

const authUser = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            success: false,
            message:"Sorry no token found in middleware"
        })
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(400).json({
            success:false,
            message:"Sorry token is blacklisted"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()


    }catch(err){
        return res.status(400).json({
            success: false,
            message:"SInvalid token",
            error:err
        })
    }


}

export default authUser