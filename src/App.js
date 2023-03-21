import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import{useEffect, useState} from 'react'
import './App.css';
import Signup from './Signup';
import Home from './Home';
import DrugForm from './DrugForm'
import Login from "./Login";
import Navbar from './Navbar'



function App() {
  const[user,setUser]=useState('')
  const[isLoading,setLoading]=useState(null)
  const[error,setError]=useState(null)
  
useEffect(()=>{
  let user=JSON.parse(localStorage.getItem('user'))
  if(user){
    setUser(user)
  }
},[])



  return (
    <div className="App">
      <Router>
      
      <Navbar user={user} setUser={setUser}/>
<Routes>
<Route path="/"  element={user?<Home user={user} setUser={setUser}/>:<Navigate to='/login'/>}/>

<Route path="/DrugForm"  element={user?<DrugForm setError={setError} user={user} error={error} />:<Navigate to='/login'/>}/>

<Route path="/Login"  element={!user?<Login  user={user} setUser={setUser}  isLoading={isLoading}  setLoading={setLoading} error={error}   setError={setError}/>:<Navigate to='/'/>}/>
    
<Route path="/Signup"  element={!user?<Signup user={user} setUser={setUser}  isLoading={isLoading}  setLoading={setLoading} error={error}   setError={setError}/>:<Navigate to='/'/>}/>      

</Routes>
</Router>


    
   


    </div>
  );
}

export default App;
