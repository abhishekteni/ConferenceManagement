import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuthContext } from '../hooks/useAuthContext'
// import { usePapersContext } from '../hooks/usePapersContext';
import {CSVLink} from 'react-csv'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function ProfileDetails() {
  const [users, setUsers] = useState([]);
  const [userno,setUserno]=useState();
  const [admincount,setAdmincount]=useState();
  const [authorcnt,setAuthor]=useState();
  const [reviewercnt,setReviewercnt]=useState();
  const [blogcount,setBlogcount] = useState();
  const [blog_data,setBlogData] = useState([]);
  // const [role,setRole]=useState()
  const {user} = useAuthContext()
  // const {papers, dispatch} = usePapersContext()
  const handleChange = async (e, userId) => {
    const value = e.target.value;
    // console.log(userId)
    // console.log(value)
    if(!user){
      return
    }
    const response = await fetch(`/api/papers/admin123/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      },
      body: JSON.stringify({
        "_id":userId,
        "email":users.email,
        "role": value || (users.role),
      }),
    })
    const json = await response.json()


    if (response.ok) {
      // dispatch({type: 'UPDATE_USER', payload: json})
      // setUsers(json)

      

      alert("user updated sucessfully")

         // Fetch updated data
    axios
    .get('/api/papers/admin123', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      setUsers(response.data);
      setAdmincount(response.data.filter(item => item.role === 'admin').length);
      setAuthor(response.data.filter(item => item.role === 'author').length);
      setReviewercnt(response.data.filter(item => item.role === 'reviewer').length);
    })
    .catch((error) => {
      console.log(error);
    });

    }
  }


  useEffect(() => {
    axios.get('/api/papers/admin123', {
      headers : {
        'Authorization':`Bearer ${user.token}`
      }
    })
      .then(response => {
        setUserno(response.data.length)
        setUsers(response.data);
        setAdmincount(response.data.filter(item => item.role === 'admin').length);
        setAuthor(response.data.filter(item => item.role === 'author').length);
        setReviewercnt(response.data.filter(item => item.role === 'reviewer').length);
        // console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('/api/papers/all', {
        headers : {
          'Authorization':`Bearer ${user.token}`
        }
      })
        .then(response => {
          setBlogData(response.data);
          setBlogcount(response.data.length)
        })
        .catch(error => {
          console.log(error);
        });
  }, []);



  return (
    <>
    <div className='card_container'>
    <div className='card_box'>
    <Card sx={{ minWidth: 275,maxWidth: 280,minHeight:170 }}>
    <CardContent>
      <Typography variant="h5" component="div" color="#1aac83">
        {userno}
      </Typography>
      <Typography sx={{ mb: 1.5 }}>
        users
      </Typography>
      <Typography variant="body2">
        Total no. of users <br/>
       <CSVLink style={{ textDecoration: 'none' }} data={users} filename="User_data.csv">

        <Button color="success">
        Export to csv
        </Button>
        </CSVLink>

      </Typography>
    </CardContent>

  </Card>
  </div>
  <div className='card_box'>
  <Card sx={{ minWidth: 275,maxWidth: 280,minHeight:170 }}>
  <CardContent>
    <Typography variant="h5" component="div" color="#1aac83">
      {admincount}
    </Typography>
    <Typography sx={{ mb: 1.5 }}>
      Admins
    </Typography>
    <Typography variant="body2">
      Total no. of Admins
      <br />
    </Typography>
  </CardContent>

</Card>
</div>
<div className='card_box'>
<Card sx={{ minWidth: 275,maxWidth: 280,minHeight:170 }}>
<CardContent>
  <Typography variant="h5" component="div" color="#1aac83">
  {authorcnt}
  </Typography>
  <Typography sx={{ mb: 1.5 }}>
  Total no. of Authors
  </Typography>
  <Typography variant="h5" component="div" color="#1aac83">
  {reviewercnt}

  </Typography>
  <Typography sx={{ mb: 1.5 }}>
  Total no. of Reviewer
  </Typography>
</CardContent>

</Card>
</div>
<div className='card_box'>
<Card sx={{ minWidth: 275,maxWidth: 280,minHeight:170 }}>
<CardContent>
  <Typography variant="h5" component="div" color="#1aac83">
    {blogcount}
  </Typography>
  <Typography sx={{ mb: 1.5 }}>
    Blogs
  </Typography>
  <Typography variant="body2">
    Total no. of Blogs Written till date
    <br />
    <CSVLink style={{ textDecoration: 'none' }} data={blog_data} filename="Blog_data.csv">
    <Button  color="success">
    Export to csv
    </Button>
    </CSVLink>
  </Typography>
</CardContent>

</Card>
</div>
  </div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>_id</TableCell>
          <TableCell >Email</TableCell>
          <TableCell  >role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      {Array.isArray(users) && users.reverse().map(user => (
        <TableRow key={user._id}>
        <TableCell>{user._id}</TableCell>
          <TableCell>{user.email}</TableCell>
          { (user.role==="author" || user.role==="reviewer")? <TableCell align="left">   
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
       
      {/*<InputLabel id="demo-simple-select-standard-label">{paper.blog_status}</InputLabel>*/}
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={user.role}
        onChange={(event) => handleChange(event, user._id)}
        
      > 
      <MenuItem value="author"  >author</MenuItem>
        <MenuItem value="admin" >admin</MenuItem>
        <MenuItem value="reviewer" >reviewer</MenuItem>
      </Select>
      {/*<input type="text" name="role" value={user.role} onChange={(e)=>{setRole(e.target.value)}} />*/}
      {/*<Button variant="outlined" onChange={handleChange}>update</Button>*/}
      </FormControl>
      
          </TableCell>
      
        : <TableCell align="left">{user.role}</TableCell>}
        </TableRow>
      ))}
      
      </TableBody>
    </Table>
    </TableContainer>
    </>
  );
}

export default ProfileDetails;



