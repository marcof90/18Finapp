import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from './App'
import Login from './components/auth/login/Login'

export default function Router(){
    return (
        <Routes>
            <Route path={'/'} element={<App />} />
            <Route path={'/login'} element={<Login />} />
        </Routes>
    )
}