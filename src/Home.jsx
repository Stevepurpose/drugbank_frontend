import React from 'react'
import { useState,useEffect } from 'react'
import Drugs from './Drugs'
import {Link}from "react-router-dom"
import BACKENDURL from './Back'




const Home = ({user, setUser, error, setError, drugs, setDrugs, updateDrug}) => {

let now=new Date().toISOString()
let today=new Date().toString()
 

useEffect(()=>{
const getDrugs=async()=>{
   const res= await BACKENDURL.get("/api/drugs",{headers:{
    'Authorization':`Bearer ${user.token}`
   }
})  
 setDrugs(res.data) 

}


if(user){
getDrugs()
}
},[setDrugs,user])


const sortedDrugs=[...drugs].sort((a,b)=>a.drugName.localeCompare(b.drugName))
    
  return (
     <div className="homepage">
      <h1>AS AT {today.toString()}</h1>
      <div className='on-line'>
      <h1 className="home-head">Chemist Stock Taker</h1>
     <Link className='stocker' to="/DrugForm" id="adder"><button className='we-inside'>ADD STOCK</button></Link>  

      </div>
      
      
    
        
     
     {sortedDrugs && sortedDrugs.map(drug=>(
        <Drugs key={drug._id} drug={drug} now={now} drugs={drugs} setDrugs={setDrugs} user={user} error={error} setError={setError} updateDrug={updateDrug} />
       )) }    
        
  
  
    </div>
  )
}

export default Home