import React from 'react'
import  {PencilSimple, Trash}  from "phosphor-react"
import moment from 'moment'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import BACKENDURL from './Back'


const Drugs = ({drug,now,drugs,setDrugs,user}) => {
  
 //date formatter
 const startDate=moment(now)
const endDate=moment(drug.expiryDate)
const duration=moment.duration(moment(endDate).diff(moment(startDate)))
const days=Math.floor(duration.asDays())


  async function handleDelete(){
if(!user){
  return
}


try{
  
let res=await BACKENDURL.delete(`/api/drugs/${drug._id}`,{headers:{
  'Authorization':`Bearer ${user.token}`
}
 })

let stock=drugs.filter(item=>item._id!==drug._id) //added res to data
setDrugs(stock)

}catch(error){
  console.log(error)
}
  }
 





    return (
    <div className='drug-specs'>
        <h4>MED:{drug.drugName}</h4>
        <p>BRAND:{drug.brand}</p>
        <p>PACKS:{drug.numOfPacks}</p>
        
      { now < drug.expiryDate ? <p style={{color:'green'}}>EXP:{drug.expiryDate}</p> :
      
      
now >drug.expiryDate ?  <p style={{color:'red'}}>EXP:{drug.expiryDate}</p>:
<p>{drug.expiryDate}</p>

}

    { days< 90 && days > 0 ? <p style={{color:'darkorange', opacity:1.80 }}>{days}  days left<br/>prioritize sale!!!</p>:
    
    days < 0 ?<p style={{color:'red'}} > Expired!!!! </p>:
    days > 90 ? <p style={{color:'blue'}}>{days} days left</p>:
     null
     }
      <div className='button-group'>
      <button onClick={handleDelete}><Trash color='red' size={32}/></button>
      <Link to={`/update-drug/${drug._id}`}><button><PencilSimple color='blue' size={32}/></button></Link>
      </div>
    </div>
  )
}

export default Drugs