import React from 'react'
import axios from "axios";

let my_api = process.env.REACT_APP_BACKEND_API_URL
   const BACKENDURL=axios.create({
    baseURL:my_api
  
  })
  
  export default BACKENDURL