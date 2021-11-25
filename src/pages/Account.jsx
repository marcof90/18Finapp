import React, {useEffect, useState, useRef} from 'react'
import IncomesList from '../components/Incomes'
import OutcomesList from '../components/Outcomes'
import axios from 'axios'
import authHelper from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom'

export default function Account() {
    const [incomes, setIncomes] = useState([])
    const [outcomes, setOutcomes] = useState([])

    const value = useRef()
    const description = useRef()
    const typeOption = useRef()

    useEffect(()=>{
        updateIncomes()
        updateOutcomes()
    }, [])

    const addMovement = function(){
        let url = null
        let income = false
        if(typeOption.current.value === '1'){
            url = process.env.REACT_APP_API_URL+'incomes/'
            income = true
        }else if(typeOption.current.value === '2'){
            url = process.env.REACT_APP_API_URL+'outcomes/'
        }else{
            alert('debes seleccionar un tipo')
        }
        if(url){
            let form = new URLSearchParams()
            form.append('value', value.current.value)
            form.append('description', description.current.value)
            axios.post(url, form, { headers: { 'x-auth-token': authHelper.getToken()}})
            .then(res=>{
                income ? updateIncomes(): updateOutcomes()
            })
            .catch(err => console.log(err))
        }
    }

    const updateIncomes = function(){
        axios.get(process.env.REACT_APP_API_URL+'incomes/',{
            headers: {
                'x-auth-token': authHelper.getToken()
            }
        })
        .then(res=> {
            console.log(res)
            setIncomes(res.data.incomes)
        })
        .catch(err => console.log(err))
    }

    const updateOutcomes = function(){
        axios.get(process.env.REACT_APP_API_URL+'outcomes/', {
            headers: {
                'x-auth-token': authHelper.getToken()
            }
        })
        .then(res => {
            setOutcomes(res.data.outcomes)
        })
        .catch(err => console.log(err))
    }

    return (
        authHelper.getToken() ?
        <div>
            {/* <button onClick={updateIncomes}>Incomes</button> */}
            <div>
                <label htmlFor="value">Valor</label>
                <input ref={value} type="number" id="value" />
                <label htmlFor="desc">Descripción</label>
                <input ref={description} type="text" id="desc"/>
                <label htmlFor="">Tipo</label>
                <select ref={typeOption} name="" id="">
                    <option value="">Selecciona un tipo</option>
                    <option value="1">Ingreso</option>
                    <option value="2">Egreso</option>
                </select>
                <button onClick={addMovement}>Agregar</button>
            </div>
            <div>
                <h2>Balance</h2>
                <h3>Total: {}</h3>
            </div>
            <div>
                <h2>Ingresos</h2>
                <IncomesList incomes={incomes}/>
            </div>
            <div>
                <h2>Egresos</h2>
                <OutcomesList outcomes={outcomes}/>
            </div>
        </div>: <Navigate to={'/login'} />
    )
}
