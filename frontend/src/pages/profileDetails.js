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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAuthContext } from '../hooks/useAuthContext'
function ProfileDetails() {
  const [users, setUsers] = useState([]);
  const {user} = useAuthContext()
  // const {papers, dispatch} = usePapersContext()
  const handleChange = async (e) => {
    const value = e.target.value;

    // const reviewer_comment=reviewerC  
    // const overall_score2=overall_score1

    // setSelectedOption(e.target.value);

    if(!user){
      return
    }
    const response = await fetch('/api/papers/admin123/' + users._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      },
      body: JSON.stringify({
        _id:users._id,
        email:users.email,
        role: value || (users.role),
      }),
    })
    const json = await response.json()

    if (response.ok) {
      // dispatch({type: 'UPDATE_USER', payload: json})
      setUsers(json)
    }
  }


  useEffect(() => {
    axios.get('/api/papers/admin123', {
      headers : {
        'Authorization':`Bearer ${user.token}`
      }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>_id</TableCell>
          <TableCell >Email</TableCell>
          <TableCell >role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {users.reverse().map(user => (
        <TableRow key={user._id}>
        <TableCell>{user._id}</TableCell>
          <TableCell>{user.email}</TableCell>
          { (user.role=="admin")? <TableCell align="right">   
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
       
      {/*<InputLabel id="demo-simple-select-standard-label">{paper.blog_status}</InputLabel>*/}
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={user.role}
        onChange={handleChange}
      > 
      <MenuItem value="author"  >author</MenuItem>
        <MenuItem value="admin" >admin</MenuItem>
        <MenuItem value="reviewer" >reviewer</MenuItem>
      </Select>
      {/*<Button variant="outlined" onChange={handleChange}>update</Button>*/}
      </FormControl>
      
          </TableCell>
      
        : <TableCell align="right">{user.role}</TableCell>}
        </TableRow>
      ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
}

export default ProfileDetails;



