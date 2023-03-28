import { useSignup } from "../hooks/useSignup"

const { useState } = require("react")


const Signup=()=>{
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [role,setRole]=useState('author')
const {signup,error,isLoading} = useSignup()
const handleSubmit=async(e)=>{
    // default behaviour is to refresh the page hence 
    e.preventDefault()

    await signup(email,password,role)


}

return(
    <form className="signup" onSubmit={handleSubmit}>
        <h3>signup Form</h3>
        <label>Email:</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        <label>Password</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <label>role:</label>
        <input onChange={(e)=>{setRole(e.target.value)}} value={role}/>
        <button disabled={isLoading}>signup</button>
        {error && <div className="error">{error}</div>}
    </form>

)
}

export default Signup