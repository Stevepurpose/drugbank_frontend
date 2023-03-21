import { useState } from "react";

function Signup({user,setUser,isLoading,setLoading,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')


  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
   setError(null)
   const res=await fetch('api/user/signup',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
   })
const data=await res.json()

if(!res.ok){
    setLoading(false)
    setError(data.error)
}
 else if(res.ok){
  //save user to local storage
  setUser(data)
  localStorage.setItem('user',JSON.stringify(data)) 
 // setUser(data)
  
  
  setLoading(false)
  console.log(data)
    
}
    

   setEmail('')
setPassword('')

}

function handleEmail(e){

    setEmail(e.target.value)
}

function handlePassword(e){

    setPassword(e.target.value)
}

return(
<div className="form-div">
    <form  onSubmit={handleSubmit}>
<input type="email" onChange={handleEmail} value={email}  placeholder="Email"  className="form-input" />
<input type="password" onChange={handlePassword} value={password}  placeholder="password"   className="form-input"/>
<div>
<button className="keys" disabled={isLoading}>Signup</button>
</div>
{error&&<p>{error}</p>}
    </form>
    
</div>
)

}

export default Signup


