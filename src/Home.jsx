import React from 'react'
import { useState,useEffect } from 'react'
import Drugs from './Drugs'
import {Link}from "react-router-dom"
import BACKENDURL from './Back'


const Home = ({user,setUser}) => {
const[drugs,setDrugs]=useState([])
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
   
    </div>
  )
}

export default Home