import { useState, type ReactNode } from "react"
import { AuthContext } from "./auth.context"


type AuthProviderProps = {
    children: ReactNode
}

interface User {
    id: string,
    username: string,
    email: string
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)





    return (
        <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
            {children}

        </AuthContext.Provider>
    )

}