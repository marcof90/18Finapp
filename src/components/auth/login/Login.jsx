import axios from "axios";
import React, { Fragment, useRef } from "react";
import './login.css'
import { useNavigate, Navigate } from 'react-router-dom'
import User from '../../../models/user'
import authHelper from '../../../helpers/auth.helper'

export default function Login(){

    let navigate = useNavigate()

    const email = useRef();
    const pass = useRef();

    const signIn = async () => {
        let form = new URLSearchParams()
        form.append('email', email.current.value)
        form.append('password', pass.current.value)
        console.log(process.env.REACT_APP_API_URL)
        const data = await axios.post(process.env.REACT_APP_API_URL+'auth/login',form,{
            header:{'Accept': 'application/json'}
        } )
        await authHelper.setToken(data.data.token)
        let userData = data.data.user
        let user = new User(userData._id, userData.name, userData.email )
        console.log(user)
        navigate('/')
    }

    return (
        !authHelper.getToken() ?
        <Fragment>
            <h2>Inicio de sesión</h2>
            <label htmlFor="email">E-Mail</label>
            <input ref={email} type="email" name="" id="email" />
            <label htmlFor="pass">Contraseña</label>
            <input ref={pass} type="password" name="" id="pass" />
            <button onClick={signIn}>Ingresar</button>
        </Fragment>:
        <Navigate to={'/'}/>
    )
}