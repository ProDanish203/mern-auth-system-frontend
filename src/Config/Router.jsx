import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Hero } from "../Components/Hero";
import { Login, Signup } from "../Pages";

export const Router = ({ setUser }) => {
  return (
    <Routes>
        <Route path="/" element={<Login setUser={setUser}/>}/>
        <Route path="/home" element={<Hero/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>

    </Routes>
  )
}
