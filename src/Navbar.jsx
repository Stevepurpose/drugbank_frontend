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
        <h1 className="home-headnext">Chemist Stock Taker</h1>
        <h2>TO TEST:</h2>
        <h3>LOGIN EMAIL:monalisuarev@gmail.com</h3>
        <h4>LOGIN PASSWORD:ABCabc123!</h4>
       <div className='for-Links'>
        <FirstAid color='green' size={64} id="logo"/>
       <nav>


       {user && ( <div className='for-stocker'>  
      <span>{user.email}</span>
<button className='stocker' onClick={handleClick}>Logout</button>

</div>)}

       {!user && (<div className='for-stocker'>
        <Link className='stocker' to ="/Login"><button className='keys'> Login</button></Link>
        </div>)}


        </nav> 

    </div>
    </header>
  )
}

export default Navbar