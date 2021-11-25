import React, {Fragment, useRef} from 'react'
import authHelper from '../../../helpers/auth.helper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const name = useRef()
    const email = useRef()
    const pass = useRef()

    const signup = async ()=>{
        let form = new URLSearchParams()
        form.append('name', name.current.value)
        form.append('email', email.current.value)
        form.append('password', pass.current.value)
        const data = await axios.post(process.env.REACT_APP_API_URL+'auth/register', form, {
            header: {'Accept':'application/json'}
        })
        authHelper.setToken(data.data.token)
        navigate('/')
    }

    return (
        <Fragment>
            <h1>Registro de ususarios</h1>
            <label htmlFor="name">Nombre</label>
            <input ref={name} type="text" id="name"/>
            <label htmlFor="email">E-mail</label>
            <input ref={email} type="email" id="email"/>
            <label htmlFor="pass">Contaseña</label>
            <input ref={pass} type="password" id="pass"/>
            <button onClick={signup}>Registrarme</button>
        </Fragment>
    )
}
