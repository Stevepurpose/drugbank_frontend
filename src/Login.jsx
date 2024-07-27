import { useState } from "react";
import BACKENDURL from './Back'
import LoadingIndicator from "./components/LoadingIndicator";

function Login({user,setUser,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const [loading, setLoading] = useState(false);


function handleEmail(e){

    setEmail(e.target.value)
}

function handlePassword(e){

    setPassword(e.target.value)
}


    async function handleSubmit(e){
        setLoading(true);   
        e.preventDefault()
    
    try{
        
     let  body={email:email,password:password}
    const res=await BACKENDURL.post("/api/users/login",body,{headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${user.token}`
    }}
)
    

    localStorage.setItem('user',JSON.stringify(res.data)) 
    
    setUser(res.data)
   
    setEmail('')
    setPassword('')
    setError(null) 
 }
 catch(error){
    setUser(null)
     setError(error)   
 }
 
 finally {
    setLoading(false)
}

}



return(
<div className="form-guide">
<p className="pass-guide">Passwords must contain a mix of uppercase, lowercase and special characters.</p>
    <form  onSubmit={handleSubmit}>
<input type="email" onChange={handleEmail} value={email}  placeholder="Email"  className="form-input" id="login_input"/>
<input type="password" onChange={handlePassword} value={password} placeholder="password"   className="form-input" id="login_pass"/>
{loading && <LoadingIndicator />}
<button className="keys">Login</button>
    </form>

    {error&&<p className="warning">incorrect details</p>}
    
</div>
)

}

export default Login


