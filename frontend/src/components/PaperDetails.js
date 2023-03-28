import { usePapersContext } from '../hooks/usePapersContext'
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';



const PaperDetails = ({ paper }) => {
  const { dispatch } = usePapersContext();
  const {user} = useAuthContext();

  const [selectedOption, setSelectedOption] = useState('pending');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = async (e) => {
    const value = e.target.value;
    console.log(value+"ballo");
    setSelectedOption(e.target.value);
    // setBlogstatus(value)
    console.log(selectedOption+"hello")
    if(!user){
      return
    }
    const response = await fetch('/api/papers/' + paper._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      },
      body: JSON.stringify({
        papertitle:paper.papertitle,
        authors:paper.authors,
        keywords:paper.keywords,
        abstract:paper.abstract,
        pdf_attachment:paper.pdf_attachment,
        blog_status: value,
        Date: paper.createdAt
      }),
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_PAPER', payload: json})
    }
  }








  const handleClick = async () => {
    if(!user){
      return
    }
    const response = await fetch('/api/papers/' + paper._id, {
      method: 'DELETE',
      headers: {
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PAPER', payload: json})
    }
  }


  return (
   <> 
    <TableRow className="paper-details"
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell align="left">{paper.papertitle}</TableCell>
    <TableCell align="right">{paper.authors}</TableCell>
    <TableCell align="right">{paper.keywords}</TableCell>
    <TableCell align="right">{paper.abstract}</TableCell>
    <TableCell align="right">{paper.pdf_attachment}</TableCell>
    { (user.role=="admin")? <TableCell align="right">   
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
 
{/*<InputLabel id="demo-simple-select-standard-label">{paper.blog_status}</InputLabel>*/}
<Select
  labelId="demo-simple-select-standard-label"
  id="demo-simple-select-standard"
  value={paper.blog_status}
  onChange={handleChange}
  sx={{
    '& .MuiSelect-icon': { color: 'black' },
    '&:before, &:after': { borderBottomColor: 'black' },
    '& .MuiListItem-root.Mui-selected': { backgroundColor: 'red' },
    '& .MuiListItem-root.Mui-selected:hover': { backgroundColor: 'pink' },
    '& .MuiList-root.Mui-menu-list': {
      backgroundColor:
        selectedOption === 'pending'
          ? 'red'
          : selectedOption === 'accept'
          ? 'green'
          : selectedOption === 'reject'
          ? 'orange'
          : 'inherit',
    },
  }}
> 
<MenuItem value="pending"  >pending</MenuItem>
  <MenuItem value="accept" >accept</MenuItem>
  <MenuItem value="reject" >reject</MenuItem>
</Select>
{/*<Button variant="outlined" onChange={handleChange}>update</Button>*/}
</FormControl>

    </TableCell>

  : <TableCell align="right">{paper.blog_status}</TableCell>}


    <TableCell align="right">{formatDistanceToNow(new Date(paper.createdAt), { addSuffix: true })}</TableCell>

    { (user.role=="admin")? <TableCell align="right"><Button variant="outlined" color="error" align="right" onClick={handleClick}>delete</Button></TableCell> : ''}
    { (user.role=="admin" || user.role=="reviewer" )? <TableCell align="right">  <Button variant="outlined" onClick={handleClickOpen}>
    comment
  </Button></TableCell>:''}
    </TableRow>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
    </Dialog>
    </>
  )
}

export default PaperDetails









// <select value={paper.blog_status} onChange={handleChange}>
// <option value="pending">pending</option>
// <option value="accept">accept</option>
// <option value="reject">reject</option>
// </select>