import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()

    const { loading, handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
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
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={(e) => { setUsername(e.target.value) }} name="username" placeholder="Enter username" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" onChange={(e) => { setEmail(e.target.value) }} name="email" placeholder="Enter email address" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" placeholder="Enter your password" />
                    </div>

                    <button className="button primary-button">Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>

                {username}
                {email}
                {password}
            </div>
        </main>
    )
}

export default Register