import React from 'react'
import { useState } from 'react'
import Navbar2 from './Navbar2'
//import axios from 'axios'
import BACKENDURL from './Back'
import { useNavigate } from 'react-router-dom'


const DrugForm = ({user, setError, error, getDrugs}) => {
let[drugName,setDrugName]=useState('')
let[brand,setBrand]=useState('')
let[numOfPacks,setNumOfPacks]=useState('')
let[expiryDate,setExpiryDate]=useState('')

const navigate = useNavigate();

function handleSubmit(e){
  e.preventDefault()




 let headers={
    'Content-Type':'application/json',
    'Authorization':`Bearer ${user.token}`
}

  let drug={drugName,brand,numOfPacks,expiryDate} //req body sending to API


  
   BACKENDURL.post("/api/drugs", drug, {headers})
              .then((res)=>{

                if (res.status === 201) alert("Drug added");
              else alert("Failed to add drug.");
            // getDrugs()
          navigate('/')
         setDrugName('')         
         setBrand('')
        setNumOfPacks('')
       setExpiryDate('')
})
 .catch((error)=>{
  setError(error)
})
 

}



  return (
  
     <div className='form-zone'>
    <Navbar2/>   
<h1>Add Drug</h1>
    <form  className='form-div' onSubmit={handleSubmit}  id='inner-form'>
<input type="text" onChange={(e)=>setDrugName(e.target.value)} 
value={drugName} placeholder='DRUG NAME' className='form-input2' />

<input type="text" onChange={(e)=>setBrand(e.target.value)} 
value={brand} placeholder='BRAND'className='form-input2' />

<input type="number" onChange={(e)=>setNumOfPacks(e.target.value)} 
value={numOfPacks} placeholder='NUM OF PACKS' className='form-input2'/>

<input type="date" onChange={(e)=>setExpiryDate(e.target.value)} 
value={expiryDate} placeholder='EXPIRY DATE'className='form-input2' />
<button id="tosubmit">ADD</button>

    </form>
    <p>{error}</p>
    </div>
  
  )
}

export default DrugForm