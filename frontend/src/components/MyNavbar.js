import { Navbar, Nav, Container } from 'react-bootstrap';
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import DarkMode from './Darkmode'
import "./DarkMode.css";
const MyNavbar = () => {
  const logout = useLogout()

  const navRef=useRef();
  const handleClick=()=>{
    logout()
  }
//   const setDarkMode=()=>{
//     const hamburger=document.querySelector(".hamburger")
//     hamburger.onClick=()=>{
//       const navBar=document.querySelector("navbar_io")
//       navBar.classList.toggle("active")
//     }
// }

const shownavbar=()=>{
  navRef.current.classList.toggle('active')
}

  const {user}=useAuthContext()
  return (
    <Navbar>
      <div className="container">
        <Link to="/">
          <h1 className='logo_design'>Confe<b style={{color:"red"}}>Rence</b> Management</h1>
        </Link>
        <nav className='navbar_io' ref={navRef}>
      <DarkMode/> 
        {
          user && (
        <div className='navlink_con'>
        <span>{user.email}</span>
        <Link to="/data">
        <h4>{user.role}</h4>
       
      </Link>
         <button onClick={handleClick}>Logout</button>
       
         </div>
          )
        }
        { !user && (
        <div className='navlink_con'>
        <Link to="/login">
          <h1>Login</h1>
        </Link>
        <Link to="/signup">
          <h1>Signup</h1>
        </Link>
      
        </div>
        )
        }

    
        </nav>
        <div className='hamburger' onClick={shownavbar}>
        <div className='line1'></div>
        <div className='line1'></div>
        <div className='line1'></div>
        </div>
      </div>
    </Navbar>


  )
}

export default MyNavbar