import { useState } from "react";



function Login({user,setUser,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')


    async function handleSubmit(e){
    e.preventDefault()
    
    try{
    setError(null) //might be moved close to  setEmail('') or deleted
    
    const res=await fetch('/api/user/login',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({email,password})
    })
    console.log(res)

    if(!res.ok){
        throw new Error('Network response was not ok')
    }


 const json=await res.json()
 setUser(json)
    localStorage.setItem('user',JSON.stringify(json)) 

    }


 catch(error){
    setUser(null)
     setError(error.message)
 }
 //might move this section into the try block and include setError(null) with them
 
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
<button className="keys">Login</button>
</div>

    </form>
    {error&&<p className="warning">{error}</p>}
</div>
)

}

export default Login


