import { useEffect, useState }from 'react'
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
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import zIndex from '@mui/material/styles/zIndex'
const Home = () => {
  const [open, setOpen] = useState(false);
  const {papers, dispatch} = usePapersContext()
  const {user} = useAuthContext()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPapers = async () => {
      const response = await fetch('/api/papers',{
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
      fetchPapers()

    }
  }, [dispatch,user])

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>papertitle</TableCell>
            <TableCell align="right"> authors</TableCell>
            <TableCell align="right">keywords</TableCell>
            <TableCell align="right">abstract</TableCell>
            <TableCell align="right">pdf_attachment</TableCell>
            <TableCell align="right">blog_status</TableCell>
            <TableCell align="right">Date</TableCell>
             <TableCell align="right">{ (user.role=="admin")? 'delete':''}</TableCell>
            <TableCell align="right">comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
        {papers && papers.map((paper) => (
         
          <PaperDetails key={paper._id} paper={paper} />
         
        ))}
        
        </TableBody>
      
        </Table>
        </TableContainer>
        <div>
      <Button variant="outlined" onClick={handleClickOpen}  sx={{
        borderRadius: 50,
        width: "60px",
        height:'60px',
        background:'#1aac83',
        color:'white',
        position:'fixed',
        bottom: 50, right: 50, m: 0,
        zIndex:'+100',
        fontSize:'50px',
        ":hover":{
          background:'#1e8f6f'
        }
      }}>
        +
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { position: "fixed", width: "50%" ,top: 10, left: 'auto', m: 0, p:2 } }} >
      <PaperForm />
      </Dialog>
      </div>
    </>
  )
}

export default Home