import { createContext, useReducer } from 'react'

export const PapersContext = createContext()

export const papersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAPERS': 
      return {
        papers: action.payload
      }
    case 'CREATE_PAPER':
      return {
        papers: [action.payload, ...state.papers]
      }
    case 'DELETE_PAPER':
      return {
        papers: state.papers.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_PAPER':
      return {papers: state.papers.map((w) =>  w._id === action.payload._id ? action.payload : w)
      }
    case 'UPDATE_USER':
        return {users: state.users.map((w) =>  w._id === action.payload._id ? action.payload : w)
        }  
    default:
      return state
  }
}

export const PapersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(papersReducer, {
    papers: null
  })

  return (
    <PapersContext.Provider value={{...state, dispatch}}>
      { children }
    </PapersContext.Provider>
  )
}