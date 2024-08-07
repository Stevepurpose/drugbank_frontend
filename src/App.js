import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import{useEffect, useState} from 'react'
import './App.css';
import Home from './Home';
import DrugForm from './DrugForm'
import Login from "./Login";
import Navbar from './Navbar'
import UpdateForm from "./UpdateForm";



function App() {
  const[user,setUser]=useState('')
  const[drugs,setDrugs]=useState([])
 // const[isLoading,setLoading]=useState(null)
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

<Route path="/"  element={user?<Home user={user} setUser={setUser}  drugs={drugs}  setDrugs={setDrugs}  error={error}   setError={setError}/>:<Navigate to='/login'/>}/>

<Route path="/DrugForm"  element={user?<DrugForm setError={setError} user={user}   drugs={drugs}  setDrugs={setDrugs} error={error} />:<Navigate to='/login'/>}/>

<Route path="/Login"  element={!user?<Login  user={user} setUser={setUser}   error={error}   setError={setError}/>:<Navigate to='/'/>}/>
    
<Route path="/update-drug/:_id"  element={user?<UpdateForm user={user} error={error} drugs={drugs} setDrugs={setDrugs}/>:<Navigate to='/login'/>}/>

</Routes>
</Router>


    
   


    </div>
  );
}

export default App;
