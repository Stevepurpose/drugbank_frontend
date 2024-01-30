import React from 'react'
import {Link} from "react-router-dom"
import  {FirstAid}  from "phosphor-react"


const Navbar = ({user,setUser}) => {



const handleClick=()=>{
  localStorage.removeItem('user')
  setUser('')
}


  return (
    <header>
       {!user && ( <div className='instructions'>
        <h1 className="home-headnext">Chemist Stock Taker</h1>
        <h2>TO TEST:</h2>
        <h3 className='login-email'>LOGIN EMAIL: monalisuarev@mailon.com</h3>
        <h3>LOGIN PASSWORD: Coastalsea999!</h3>
        </div>)}
       <div className='for-Links'>
        <FirstAid color='green' size={64} id="logo"/>
       <nav>
       {user && ( <div className='for-stocker'>  
      <p className='user_mail'>{user.email}</p>
<button className='logout' onClick={handleClick}>Logout</button>
 </div>)}
 </nav> 

    </div>
</header>
  )
}

export default Navbar