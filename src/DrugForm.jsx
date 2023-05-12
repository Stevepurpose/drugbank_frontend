import React from 'react'
import { useState } from 'react'
import Navbar2 from './Navbar2'
//import axios from 'axios'
import BACKENDURL from './Back'


const DrugForm = ({user,setError,error}) => {
let[drugName,setDrugName]=useState('')
let[brand,setBrand]=useState('')
let[numOfPacks,setNumOfPacks]=useState('')
let[expiryDate,setExpiryDate]=useState('')

//async cos we reaching out to API
async function handleSubmit(e){
  e.preventDefault()


try{

 let headers={
    'Content-Type':'application/json',
    'Authorization':`Bearer ${user.token}`
}

  let drug={drugName,brand,numOfPacks,expiryDate} //req body sending to API
  
  let res=await BACKENDURL.post("/api/drugs",drug,{headers})

  
  setDrugName('')         
  setBrand('')
  setNumOfPacks('')
  setExpiryDate('')
}
catch(error){
  setError(error)
}



}


  return (
  
     <div className='form-zone'>
    <Navbar2/>   
<h1>Add or update Drug</h1>
    <form  className='form-div' onSubmit={handleSubmit}  id='inner-form'>
<input type="text" onChange={(e)=>setDrugName(e.target.value)} 
value={drugName} placeholder='DRUG NAME' className='form-input' />

<input type="text" onChange={(e)=>setBrand(e.target.value)} 
value={brand} placeholder='BRAND'className='form-input' />

<input type="number" onChange={(e)=>setNumOfPacks(e.target.value)} 
value={numOfPacks} placeholder='NUM OF PACKS' className='form-input'/>

<input type="date" onChange={(e)=>setExpiryDate(e.target.value)} 
value={expiryDate} placeholder='EXPIRY DATE'className='form-input' />
<button id="tosubmit">ADD</button>

    </form>
    <p>{error}</p>
    </div>
  
  )
}

export default DrugForm