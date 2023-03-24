import { useState } from "react";



function Login({user,setUser,isLoading,setLoading,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')


    async function handleSubmit(e){
    e.preventDefault()
    
    setLoading(true)
    setError(null)
    
    const res=await fetch('/api/user/login',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({email,password})
    })
 const data=await res.json()
 console.log(data)
 if(res.ok){
   // setUser(data)
    localStorage.setItem('user',JSON.stringify(data)) 
   setUser(data)
   
    setLoading(false)
   
  }
 
 if(!res.ok){
    setUser(null)
     setLoading(false)
     setError('invalid credentials')
     
     return
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
<input type="email" onChange={handleEmail} value={email}  placeholder="Email"  className="form-input"/>
<input type="password" onChange={handlePassword} value={password} placeholder="password"   className="form-input"/>
<div>
<button className="keys" disabled={isLoading}>Login</button>
</div>

    </form>
    {error&&<p className="warning">{error}</p>}
</div>
)

}

export default Login


