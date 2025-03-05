import React from 'react'
import { Route, Routes, } from 'react-router'
import BotRoute from './BotRoute'
import AuthRoute from './AuthRoute'

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/bot/*" element={<BotRoute />}></Route>
        <Route path="/*" element={<AuthRoute />}></Route>
      </Routes>
    </>
  )
}

export default AllRoutes