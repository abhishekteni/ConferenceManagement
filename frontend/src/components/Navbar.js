import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import DarkMode from './Darkmode'
import "./DarkMode.css";
const Navbar = () => {
  const logout = useLogout()

  const navRef=useRef();
  const handleClick=()=>{
    logout()
  }


const shownavbar=()=>{
  navRef.current.classList.toggle('active')
}

  const {user}=useAuthContext()
  return (

<>
    <header>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1 className='logo_design'>Confe<b style={{color:"#1aac83"}}>Rence</b> Management</h1>
        </Link>
        <nav className='navbar_io' ref={navRef}>
      
        {
          user && (
        <div className='navlink_con'>
        <DarkMode/> 
        <Link className="navbar-brand" to="/">
        <h1 className='user_role'>Home</h1>
        </Link>
        <span>{user.email}</span>
        {user.role==="admin"?  <Link className="navbar-brand" to="/data">
        <h1 className='user_role'>{user.role}</h1>
       
      </Link>: <span><b>{user.role}</b></span>}
  
         <button onClick={handleClick}>Logout</button>
       
         </div>
          )
        }
        { !user && (
        <div className='navlink_con'>
        <DarkMode/> 
        <Link className="navbar-brand" to="/login">
          <h1 className='log_role'>Login</h1>
        </Link>
        <Link className="navbar-brand" to="/signup">
          <h1 className='log_role'>Signup</h1>
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
     
    </header>
    </>
  )
}

export default Navbar