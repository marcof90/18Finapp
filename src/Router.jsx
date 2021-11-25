import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from './App'
import Login from './components/auth/login/Login'
import Register from "./components/auth/register/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

export default function Router(){
    return (
        <Routes>
            <Route path={'/'} element={<App />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/account'} element={<Account/>} />
            <Route path='*' element={<NotFound />} />
        </Routes> 
    )
}