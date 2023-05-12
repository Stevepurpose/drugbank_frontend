import React from 'react'
import axios from "axios";

   const BACKENDURL=axios.create({
    baseURL:process.env.REACT_APP_BACKEND_API_URL,
  
  })
  
  export default BACKENDURL