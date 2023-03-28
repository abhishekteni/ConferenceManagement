import { PapersContext } from '../context/PaperContext'
import { useContext } from 'react'

export const usePapersContext = () => {
  const context = useContext(PapersContext)

  if (!context) {
    throw Error('usePapersContext must be used inside an PapersContextProvider')
  }

  return context
}