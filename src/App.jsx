import './App.css';
import Nav from './components/Nav';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { createContext, useEffect, useState } from 'react';
import Counter from './components/Counter';
import SearchData from './components/SearchData';
import Alert from './components/Alert';
import Profile from './components/Profile';
import NutritionApi from './components/helpers/NutritionApi';




export const IsLoggedInContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month}-${day}`;

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
      NutritionApi.token = token;
      NutritionApi.bearer_token_req = {
        headers: { 
            Authorization: `Bearer ${token}`
        }
      }

    }
  }, [])

  return (
    <div className='h-screen'>
      <IsLoggedInContext.Provider value={{isLoggedIn, updatedIsLoggedIn, token, updateToken, alert, updateAlert, username, updateUsername, formattedDate}}>
        <Nav />
        <Alert />
        <Routes>
          <Route exact path={'/'} element={<Home />} />
          <Route exact path={'/signup'} element={<SignUp />} />
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/counter'} element={<Counter />} />
          <Route exact path={'/search'} element={<SearchData />} />
          <Route exact path={'/profile'} element={<Profile />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </IsLoggedInContext.Provider>
    </div>
  );
}

export default App;
