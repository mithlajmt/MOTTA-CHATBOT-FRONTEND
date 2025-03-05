import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/Login'

function authRoute() {
  return (
    <Routes>
        <Route path='/auth' element={<Login/>}></Route>
    </Routes>
  )
}

export default authRoute