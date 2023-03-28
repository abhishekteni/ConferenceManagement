import { useLogin } from "../hooks/useLogin"

const { useState } = require("react")


const Login=()=>{
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [role,setRole]=useState('author')
const {login,error,isLoading} = useLogin()
const handleSubmit=async(e)=>{
    // default behaviour is to refresh the page hence 
    e.preventDefault()

    await login(email,password,role)


}

return(
    <form className="Login" onSubmit={handleSubmit}>
        <h3>Login Form</h3>
        <label>Email:</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        <label>Password</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <label>role:</label>
        <input onChange={(e)=>{setRole(e.target.value)}} value={role}/>
        <button disabled={isLoading}>login</button>
        {error && <div className="error">{error}</div>}
    </form>

)
}

export default Login