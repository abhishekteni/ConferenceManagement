import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import ProfileDetails from './pages/ProfileDetails'
import NotFound from './pages/NotFound';
// here we create routes according to user profile
function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
         
            <Route 
              path="/"
              element={user ? <Home />:<Navigate to='/login'/>}
            />
           <Route 
              path="/data"
              element={user  ? <ProfileDetails/>:<Navigate to='/login'/>}
            />
     
            <Route 
            path="/login"
            element={!user ? <Login />:<Navigate to='/'/>}
          />
          <Route 
          path="/signup"
          element={!user ? <Signup />:<Navigate to='/'/>}
        />
        <Route 
        path='*'
          element={user ? <NotFound />:<Navigate to='/login'/>}
        />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
