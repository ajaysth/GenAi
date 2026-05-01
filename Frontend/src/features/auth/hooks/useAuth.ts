import { AuthContext } from "../AuthContext/auth.context";
import { useContext, useEffect } from "react";
import { login, register, logout, getMe } from "../services/auth.api";

type LoginProps = {
    email: string;
    password: string;
};

type RegisterProps = {
    username: string;
    email: string;
    password: string;
};

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }: LoginProps) => {
        try {
            setLoading(true)
            const data = await login({ email, password })
            console.log(data.user)
            setUser(data.user)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }


    }

    const handleRegister = async ({ username, email, password }: RegisterProps) => {

        try {

            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
            console.log(err)
        } finally {

            setLoading(false)
        }
    }

    const handleLogout = async () => {

        try {

            setLoading(true)
            await logout()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally {

            setLoading(false)
        }
    }


     useEffect(() => {
        const getAndSetUser = async () => {
            const data = await getMe()
            setUser(data.user)
            setLoading(false)
        }

        getAndSetUser()
    }, [])

    return { user, loading, handleLogin, handleLogout, handleRegister }
}