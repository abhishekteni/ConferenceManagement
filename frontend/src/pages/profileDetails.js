import { useEffect }from 'react'
import { usePapersContext } from "../hooks/usePapersContext"
// components
import PaperDetails from '../components/PaperDetails'
import PaperForm from '../components/PaperForm'
import { useAuthContext } from '../hooks/useAuthContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const profileDetails = () => {
  const {papers, dispatch} = usePapersContext()
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/papers/admin123',{
        headers : {
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PAPERS', payload: json})
      }
    }
    if(user){
      fetchProfile()

    }
  }, [dispatch,user])

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
        {papers && papers.map((paper) => (
         
          <PaperDetails key={paper._id} paper={paper} />
         
        ))}
        
        </TableBody>
      
        </Table>
        </TableContainer>
    </>
  )
}

export default profileDetails;