import React from "react";
import './styles/Contact.css'

export default function Contact({contact, checkContact}){
    const {id, name, isSelected } = contact

    const selectContact = ()=>{
        checkContact(id)
    }

    return <li className="contact">
        <input type="checkbox" checked={isSelected} onChange={selectContact} />
        {name}</li>
}