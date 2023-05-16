import React from 'react'
import { useState,useEffect } from 'react'
import Drugs from './Drugs'
import {Link}from "react-router-dom"
//import axios from 'axios'
import BACKENDURL from './Back'



const Home = ({user,setUser,error,setError,drugs,setDrugs}) => {
//const[drugs,setDrugs]=useState([])



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





const letters=[...Array(26)].map((unused,index)=>String.fromCharCode(65 + index))
const sortedDrugs=[...drugs].sort((a,b)=>a.drugName.localeCompare(b.drugName))
const drugGroups=sortedDrugs.reduce((groups,drug)=>{
const firstLetter=drug.drugName.charAt(0).toUpperCase()
if(!groups[firstLetter]){

groups[firstLetter]=[]


}

groups[firstLetter].push(drug)

return groups


},{})    //{} initialValue of reduce

  return (
     <div className="homepage">
      <h1>AS AT {today.toString()}</h1>
      <div className='on-line'>
      <h1 className="home-head">Chemist Stock Taker</h1>
  
     <Link className='stocker' to="/DrugForm" id="adder"><button className='we-inside'>ADD STOCK</button></Link>  

      </div>
      {
     letters.map(letter=>(
    <div  id={`drug-group-${letter}`}  key={letter} className='drug-list'>
        
     <h2 className='for-letter'>{letter}</h2>
     {drugGroups[letter] && drugGroups[letter].map(drug=>(
        <Drugs key={drug._id} drug={drug} now={now} drugs={drugs} setDrugs={setDrugs} user={user} error={error} setError={setError}  />
       )) }    
        
    </div>
  ))}
    </div>
  )
}

export default Home