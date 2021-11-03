import React, { useState, Fragment, useRef, useEffect} from "react"
import ContactList from "./components/ContactList"
import { v4 as uuid } from 'uuid'

export function App(){
    const [contacts, setContacts] = useState([
        // {id: 1, name:'Ana Sofia'},
        // {id: 2, name:'Ana Sofia'},
        // {id: 3, name:'Ana Sofia'},
    ])
    const KEY = 'contacts'
    const contactRef = useRef()
    
    useEffect(()=>{
        const storedContacts = JSON.parse(localStorage.getItem(KEY))
        if(storedContacts){
            setContacts(storedContacts)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(contacts))
    }, [contacts])

    const addContact = ()=>{
        const name = contactRef.current.value
        if(name === '') return
        setContacts((oldContacts)=>{
            return [...oldContacts, {id: uuid(), name}]
        })
        contactRef.current.value = null
    }

    // return ( <div>Hola React</div> )
    return (
        <Fragment>
        <ContactList contacts={contacts} />
        <input ref={contactRef} type="text" placeholder="nuevo contacto"/>
        <button onClick={addContact}>🙍Add</button>
        </Fragment>
    )
}