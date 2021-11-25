import React, { useState, Fragment, useRef, useEffect} from "react"
import ContactList from "./components/ContactList"
import { v4 as uuid } from 'uuid'
import authHelper from './helpers/auth.helper'
import { Navigate } from "react-router-dom"
import Modal from 'react-modal'

export function App(){
    const [modalOpen, setModalOpen] = useState(false)
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

    const checkContact = (id) => {
        const newContacts = [...contacts]
        const contact = newContacts.find((contact) => contact.id === id)
        contact.isSelected = !contact.isSelected
        setContacts(newContacts)
    }

    const addContact = ()=>{
        const name = contactRef.current.value
        if(name === '') return
        setContacts((oldContacts)=>{
            return [...oldContacts, {id: uuid(), name, isSelected: false}]
        })
        contactRef.current.value = null
    }

    const deleteContact = () =>{
        const selectedContacts = contacts.filter((contact) => !contact.isSelected)
        setContacts(selectedContacts)
    }

    // return ( <div>Hola React</div> )
    return (        
        authHelper.getToken() ?
        <Fragment>
        <ContactList contacts={contacts} checkContact={checkContact} />
        <input ref={contactRef} type="text" placeholder="nuevo contacto"/>
        <button onClick={addContact}>🙍Add</button>
        <button onClick={deleteContact}>🙅‍♀️</button>
        <div> 🙋‍♀️ {contacts.filter((contact) => contact.isSelected).length} contactos seleccionados </div>
        <button onClick={()=>{setModalOpen(true)}}>Open Modal</button>
        <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)}>
            <h2>Titulo</h2>
            <p>Cuerpo</p>
            <button onClick={()=>{setModalOpen(false)}}>Close</button>            
        </Modal>
        </Fragment>
        :
        <Navigate to={'/login'}/>
    )
}