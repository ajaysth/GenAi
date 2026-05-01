import { createContext } from "react";

interface User {
    id: string,
    username: string,
    email: string
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

