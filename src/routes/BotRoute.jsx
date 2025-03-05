import React from 'react'
import { Route, Routes } from 'react-router'
import ChatPage from '../pages/ChatPage'

function BotRoute() {
  return (
    <Routes>
        <Route path="/motta" element={<ChatPage />} />
    </Routes>   
  )
}

export default BotRoute