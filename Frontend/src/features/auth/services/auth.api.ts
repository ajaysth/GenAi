import axios from "axios";

interface RegisterProps {
    username: string,
    email: string,
    password: string
}

interface LoginProps {
    email: string,
    password: string
}


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials:true
})

const register = async ({ username, email, password }: RegisterProps) => {


    try {
        const res = await api.post("/api/auth/register", {
            username, email, password
        })

        return res.data

    }catch(err){
        console.log(err)
    }
   
}


//login
const login = async ({email,password}: LoginProps)=>{
    try{
        const res = await api.post("/api/auth/login", {
            email, password
        })

        return res.data
    }catch(err){
        console.log(err)
        throw err
    }

}


const logout = async ()=>{
    try{
        const res = await api.get("/api/auth/logout")
        return res.data
    }catch(err){
        console.log(err)
    }
}

const getMe = async ()=>{
    try{
       const res= await api.get("/api/auth/getme")
       return res.data
    }catch(err){
        console.log(err)
    }
}

export { register, login, logout,getMe }