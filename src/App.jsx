import './App.css';
import Nav from './components/Nav';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { createContext, useEffect, useState } from 'react';
import Companies from './components/Companies';
import Jobs from './components/Jobs';
import Alert from './components/Alert';
import Profile from './components/Profile';
import JoblyApi from './components/helpers/JoblyApi';




export const IsLoggedInContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [alert, setAlert] = useState(null);

  const updatedIsLoggedIn = () => {
    setIsLoggedIn(bool => !bool);
  }
  const updateToken = (val) => {
    setToken(val);
  }
  const updateAlert = (val) => {
    setAlert(val)
  }
  const updateUsername = (val) => {
    setUsername(val)
  }

  useEffect(()=>{
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('username');
    if(token){
      updateToken(token);
      updatedIsLoggedIn(true);
      updateUsername(user);
      JoblyApi.token = token;
      JoblyApi.bearer_token_req = {
        headers: { 
            Authorization: `Bearer ${token}`
        }
      }
    }
  }, [])

  return (
    <div>
      <IsLoggedInContext.Provider value={{isLoggedIn, updatedIsLoggedIn, token, updateToken, alert, updateAlert, username, updateUsername}}>
        <Nav />
        <Alert />
        <Routes>
          <Route exact path={'/'} element={<Home />} />
          <Route exact path={'/signup'} element={<SignUp />} />
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/Companies'} element={<Companies />} />
          <Route exact path={'/jobs'} element={<Jobs />} />
          <Route exact path={'/profile'} element={<Profile />} />
          <Route exact path={'/companies/:company'} element={<Jobs />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </IsLoggedInContext.Provider>
    </div>
  );
}

export default App;
