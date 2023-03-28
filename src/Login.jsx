import { useState } from "react";



function Login({user,setUser,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')


    async function handleSubmit(e){
    e.preventDefault()
    
    try{
    
    const res=await fetch('/api/user/login',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({email,password})
    })
    

    if(!res.ok){
        throw new Error('Network response was not ok')
    }


 const json=await res.json()
 setUser(json)
    localStorage.setItem('user',JSON.stringify(json)) 
    setEmail('')
setPassword('')
setError(null) 
    }


 catch(error){
    setUser(null)
     setError(error.message)
 }
 

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
<input type="email" onChange={handleEmail} value={user.email}  placeholder="Email"  className="form-input"/>
<input type="password" onChange={handlePassword} value={user.password} placeholder="password"   className="form-input"/>
<div>
<button className="keys">Login</button>
</div>

    </form>
    {error&&<p className="warning">{error}</p>}
</div>
)

}

export default Login


