import { createContext, useReducer,useEffect } from 'react'
// need to understand
export const AuthContext = createContext()

export const authReducer = (state,action)=>{
    switch(action.type){
    case 'LOGIN':
        return{user: action.payload}
    case 'LOGOUT':
        return{user: null}
    default:
        return state    
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch]=useReducer(authReducer,{
        user:null
    })
    // fires the use effect only once and check whether we are loged in if we loged in it will redirect to login
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
    },[])

    console.log('AuthContext State',state)
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
        {children}
        </AuthContext.Provider>
    )
}