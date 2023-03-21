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
       
       <div className='for-Links'>
        <FirstAid color='green' size={64} id="logo"/>
       <nav>


       {user && ( <div className='for-stocker'>  
      <span>{user.email}</span>
<button className='stocker' onClick={handleClick}>Logout</button>

</div>)}

       {!user && (<div className='for-stocker'>
        <Link className='stocker' to ="/Login"><button className='keys'> Login</button></Link>
        <Link className='stocker' to ="/Signup"><button className='keys'>Signup</button></Link>
        </div>)}


        </nav> 

    </div>
    </header>
  )
}

export default Navbar