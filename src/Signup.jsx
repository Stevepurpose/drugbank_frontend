import { useState } from "react";
import axios from 'axios'

function Signup({user,setUser,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')



function handleEmail(e){

    setEmail(e.target.value)
}

function handlePassword(e){

    setPassword(e.target.value)
}



  async function handleSubmit(e){
    e.preventDefault()
    try{
   const res=await axios.request('/api/user/signup',{
    method:'POST',
    data:{email:email,password:password}
   })


 setUser(res.data)
  localStorage.setItem('user',JSON.stringify(res.data))

  setEmail('')
  setPassword('')
  setError(null) 

    }

catch(error){
    setUser(null)
    setError(error)
    
}
 

}



return(
<div className="form-div">
    <form  onSubmit={handleSubmit}>
<input type="email" onChange={handleEmail} value={email}  placeholder="Email"  className="form-input" />
<input type="password" onChange={handlePassword} value={password}  placeholder="password"   className="form-input"/>
<div>
<button className="keys">Signup</button>
</div>
{error&&<p>{error}</p>}
    </form>
    
</div>
)

}

export default Signup


