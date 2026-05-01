import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import type { ReactNode } from "react"


type Props = {
    children: ReactNode
}


const Protected = ({ children }: Props) => {

    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main><p>Loading...</p></main>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} />

    }
    return children
}

export default Protected