import { useState } from "react"
import { useAuthContext } from "./useAuthContext"



export const useSignup=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()
    const signup= async(email,password,role)=>{
        setIsLoading(true)
        setError(null)
                // to reset the error
         const response = await fetch('/api/user/signup',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({email,password,role})
         })       
         const json = await response.json()
         if(!response.ok){
            setIsLoading(false)
            setError(json.error)
         }
         if(response.ok){
            // sasave the user to local storage
            // jwt email role
            localStorage.setItem('user',JSON.stringify(json))
            // update the auth context
            dispatch({type :'LOGIN',payload:json})
            setIsLoading(false)

         }
    }

    return {signup,isLoading,error}
}