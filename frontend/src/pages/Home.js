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
import TableSortLabel from '@mui/material/TableSortLabel';
import zIndex from '@mui/material/styles/zIndex'
// import { DataGrid } from '@material-ui/data-grid'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([
  ]);

  const [sortColumn, setSortColumn] = useState('papertitle')
  const {papers, dispatch} = usePapersContext()
  const {user} = useAuthContext()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  // const handleUpdate = async(paper) => {
  //   const updatedData = data.map((item) => {
  //     // update the name of each item in the data array
  //     return { ...item, blog_status: "accept" };
  //   });
  
  //   // send a PUT request to update the data on the server
  //   const response = await fetch('/api/papers/' + paper._id, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization':`Bearer ${user.token}`
  //     },
  //     body: JSON.stringify(updatedData),
  //   })
  //   const json = await response.json()
    
  //   if (response.ok) {
  //     dispatch({type: 'UPDATE_PAPER', payload: json})
  //   }
  // } 

  // Fetch papers


  useEffect(() => {
    const fetchPapers = async () => {
      const response = await fetch('/api/papers',{
        headers : {
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        console.log(json[0].overall_score)
        function sortData(data, columnName) {
          for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
              if (data[i][columnName] > data[j][columnName]) {
                // swap the two objects
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
              }
            }
          }
          return data;
        }
        dispatch({type: 'SET_PAPERS', payload: sortData(json, sortColumn)})

        setData(papers)

      }
    }
    if(user){
      fetchPapers()

    }
  }, [dispatch,user,sortColumn])

  const handleSort = (column) => {
    setSortColumn(column);
  }
  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>papertitle</TableCell>
            <TableCell align="right"> authors</TableCell>
            <TableCell align="right">keywords</TableCell>
            <TableCell align="right"> <TableSortLabel onClick={() => handleSort('overall_score')}>
            overall_score
          </TableSortLabel></TableCell>
            <TableCell align="right">pdf_attachment</TableCell>
            <TableCell align="right"><TableSortLabel onClick={() => handleSort('blog_status')}>
            blog_status
          </TableSortLabel></TableCell>
            <TableCell align="right">Date</TableCell>
            { (user.role=="admin")?<TableCell align="right"> Delete </TableCell>:''}
            <TableCell align="right">comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        {papers && papers.map((paper) => (
          <PaperDetails key={paper._id} paper={paper} />
          
        ))}
        
        </TableBody>
         {/*<button onClick={handleUpdate}>Update Column</button>*/}
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

      
      <div style={{ height: 400, width: '100%' }}>

    </div>
    </>
  )
}

export default Home







