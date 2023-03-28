import { useAuthContext } from "./useAuthContext"
import { usePapersContext } from "./usePapersContext"
export const useLogout=()=>{

    const {dispatch}=useAuthContext()
    const {dispatch:paperDispatch }=usePapersContext()
    const logout=()=>{
        // remove user from storage
        localStorage.removeItem('user')
        dispatch({type :'LOGOUT'})
        paperDispatch({type :'SET_PAPERS',payload:null})
    }
    return logout
}