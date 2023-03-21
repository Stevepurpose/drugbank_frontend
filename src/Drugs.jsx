import React from 'react'
import  {Trash}  from "phosphor-react"
import moment from 'moment'

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


  let options={
    method:'DELETE',
  headers:{'Authorization':`Bearer ${user.token}`}
}
let res=await fetch('/api/drugs/'+ drug._id ,options)
const data=await res.json()
let stock=drugs.filter(drug=>drug._id!==data._id)
setDrugs(stock)
console.log(stock)
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

    { days< 90 ? <p style={{color:'darkorange',opacity:1.80 }}>{days}  days left<br/>prioritize sale!!!</p>:
     days> 90 ? <p style={{color:'blue'}}>{days} days left</p>:
    <p style={{color:'red'}} >{days} days left</p>
    }
      
      <button onClick={handleDelete}><Trash color='red' size={32}/></button>

    </div>
  )
}

export default Drugs