import { usePapersContext } from '../hooks/usePapersContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
// import PdfViewer from './PdfViewer';

// we set many different react hooks to get values which are required

const PaperDetails = ({ paper }) => {
  const { dispatch } = usePapersContext();
  const {user} = useAuthContext();

  const [selectedOption, setSelectedOption] = useState('pending');
  const [open, setOpen] = useState(false);
  const [reviewerC,setReviewerC]=useState('')
  const [privateC,setPrivateC]=useState('')
  const [reviewername,setReviewerName]=useState('')
  const [overall_score1,setOverallScore]=useState(0)
  const [draft_status,setDraft_status]=useState(false)

  // for save as draft we have used a boolean object in the database which tells the status by that we change the mode
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // in order to reduce the objects in paper schema, we merged reviewer name in the reviewer comment and accessed it by splitting
  const handleChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    const reviewer_comment=reviewerC + ":??" +(reviewername.split("@")[0])
    const private_comment = privateC
    const overall_score2=overall_score1;
    const isDraft=draft_status;
    setSelectedOption(e.target.value);

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
        blog_status: value || (paper.blog_status),
        overall_score:overall_score2||(paper.overall_score),
        reviewer_comment:reviewer_comment || (paper.reviewer_comment),
        private_comment:private_comment||(paper.private_comment),
        isDraft:isDraft,
        Date: paper.createdAt
      }),
    })
    const json = await response.json()

    if (response.ok) {
      if(json.isDraft===false){
        setReviewerC('')
        setPrivateC('')
      }
      dispatch({type: 'UPDATE_PAPER', payload: json})
    }
  }

// here we are checking whether the url posted by the user is valid or not, if it is not valid then we simily paste the url, else we fetch it by <a> tag
  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}



// Delete functionality
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
    <TableCell align="left">{paper.papertitle.substring(0, 20)}</TableCell>
    <TableCell align="right">{paper.authors.substring(0, 20)}</TableCell>
    <TableCell align="right">{paper.keywords.substring(0, 20)}</TableCell>
    <TableCell align="right">{paper.overall_score}</TableCell>
    <TableCell align="right">{ isValidUrl(paper.pdf_attachment) ? <a className="pdf_link" href={paper.pdf_attachment}><Button variant="outlined" color="success">Link</Button></a>:paper.pdf_attachment }   </TableCell>
    { (user.role==="admin")? <TableCell align="right">   
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
 

<Select
  labelId="demo-simple-select-standard-label"
  id="demo-simple-select-standard"
  value={paper.blog_status}
  onChange={handleChange}
> 
<MenuItem value="pending"  >pending</MenuItem>
  <MenuItem value="accept" >accept</MenuItem>
  <MenuItem value="reject" >reject</MenuItem>
</Select>

</FormControl>

    </TableCell>

  : <TableCell align="right">{paper.blog_status}</TableCell>}


    <TableCell align="right">{formatDistanceToNow(new Date(paper.createdAt), { addSuffix: true })}</TableCell>

    { (user.role==="admin")? <TableCell align="right"><Button variant="outlined" color="error" align="right" onClick={handleClick}>delete</Button></TableCell> : ''}
    { (user.role==="admin" || user.role==="reviewer" )? <TableCell align="right">  <Button variant="outlined" onClick={handleClickOpen}>
    comment
  </Button></TableCell>:<TableCell align="right">  <Button variant="outlined" onClick={handleClickOpen}>
  Check Status
</Button></TableCell>}
    </TableRow>
    <Dialog open={open} onClose={handleClose}  fullWidth= {true}
    maxWidth={"md"}>
    <form onSubmit={handleChange}>
    <DialogTitle>Review Details </DialogTitle>


    <DialogContent dividers>

    <DialogContent>
    <p className='dialog_sub'>Private Comments to author</p>
    <DialogContentText> 
      {(paper.isDraft===false) ? paper.reviewer_comment.split(':??')[0] : ''}
      </DialogContentText>
      <DialogContentText>
      reviewed by: <b>{paper.reviewer_comment.split(':??')[1]} <br/>Draft Submitted: {paper.isDraft ===true ? "false":"true"}</b><br/><b>Your Score: </b>{paper.overall_score} 
       </DialogContentText>
       </DialogContent>

       {
        ((paper.private_comment) && (user.role==="admin" || user.role==="reviewer" )) ?
        <DialogContent dividers>
        <p className='dialog_sub'>Private Comments to other reviewer or Admin:</p>
        <DialogContentText>
        {(paper.isDraft===false)? paper.private_comment : ''}
      
      
       </DialogContentText>
       </DialogContent>
       :
       ''

       }
     
       
      { (user.role==="admin" || user.role==="reviewer" )?
      <div>
      <DialogContent dividers>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Review to Author"
        type="String"
        fullWidth
        multiline
        variant="standard"
        value={(paper.isDraft ===true && (paper.reviewer_comment.split(':??')[1] === user.email.split('@')[0])) ? reviewerC|| paper.reviewer_comment.split(':??')[0]:reviewerC}
        onChange={(e) => {setReviewerC(e.target.value); setReviewerName(user.email)}}
      />

      <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Private Comments to another reviewer and admin"
      type="String"
      fullWidth
      multiline
      variant="standard"
      value={(paper.isDraft ===true && (paper.reviewer_comment.split(':??')[1] === user.email.split('@')[0])) ? privateC|| paper.private_comment:privateC}
      onChange={(e) => {setPrivateC(e.target.value) }}
    />
    </DialogContent>
      <InputLabel id="demo-simple-select-filled-label">Overall Score</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        fullWidth
        value={overall_score1 || paper.overall_score}
        onChange={(e) => {setOverallScore(e.target.value) }}
      >
        <MenuItem value={-1}>-1</MenuItem>
        <MenuItem value={-2}>-2</MenuItem>
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
      </Select>
      </div>
      :''}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
        {(user.role==="admin" || user.role==="reviewer" )? <><Button type="submit" onClick={()=>setDraft_status(true)}>Save as a Draft</Button> <Button type="submit" onClick={()=>setDraft_status(false)}>Publish</Button></>: ''}
      
      
    </DialogActions>
    </form>
    </Dialog>
    </>
  )
}

export default PaperDetails





