import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const logout = useLogout()
  const handleClick=()=>{
    logout()
  }


  const {user}=useAuthContext()
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Confe<b style={{color:"red"}}>Rence</b> Management</h1>
        </Link>
        <nav>
        {
          user && (
        <div>
        <span>{user.email}</span>
       
        <span> "   "{user.role}</span>
         <button onClick={handleClick}>Logout</button>
         <span>
         <Link to="/admin123">
         <h1>Admin</h1>
        
       </Link>
       </span>
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
      </div>
    </header>
  )
}

export default Navbar