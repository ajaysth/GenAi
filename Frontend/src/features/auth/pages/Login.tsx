import { Link } from "react-router";
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";



const Login = () => {

    const navigate = useNavigate()

    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleLogin({ email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Enter email address" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter your password" />
                    </div>

                    <button className="button primary-button">Login</button>

                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>

                {email}
                {password}

            </div>
        </main>
    )
}

export default Login