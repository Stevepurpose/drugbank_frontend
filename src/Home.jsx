import React from 'react'
import { useState,useEffect } from 'react'
import Drugs from './Drugs'
import {Link}from "react-router-dom"




const Home = ({user,setUser}) => {
const[drugs,setDrugs]=useState(null)
let now=new Date().toISOString()
let today=new Date().toString()
 

useEffect(()=>{
const getDrugs=async()=>{
    const res= await fetch('/api/drugs',{headers:{'Authorization':`Bearer ${user.token}`}})  //since we have our proxy in json no need adding local host here
    const data=await res.json()
    setDrugs(data)
    
}


if(user){
getDrugs()
}
},[setDrugs,user])


  return (
    
    <div className="homepage">
      <h1>AS AT {today.toString()}</h1>

      <div className='on-line'>
      <h1 id="home-head">Chemist Stock Taker</h1>
     <Link className='stocker' to="/DrugForm" id="adder"><button className='we-inside'>ADD/UPDATE STOCK</button></Link>  

      </div>
    <div className='drug-list'>
        {
      drugs && drugs.map(drug=>(
        <Drugs key={drug._id} drug={drug} now={now} drugs={drugs} setDrugs={setDrugs} user={user} />
       ))     
        }
    </div>
   {/*<Logout setUser={setUser} user={user}/>*/}  
    </div>
  )
}

export default Home