"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({children}:any) {
    const [userDeatil, setUserDetail] = useState();
    useEffect(() => {
        CreateNewUser();
    },[])
    const CreateNewUser = async ()=>{
        const result = await axios.post('/api/user',{})
        console.log(result.data);
    }
  return (
      <UserDetailContext.Provider value={{ userDeatil, setUserDetail }}>
          <div>
              {children}
          </div>
    </UserDetailContext.Provider>
    
  )
}

export default Provider
