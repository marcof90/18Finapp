import React from "react";
import Contact from "./Contact";

export default function ContactList({contacts}){
    return (
        <ol>
            {contacts.map((contact)=>(
                <Contact key={contact.id} contact={contact}/>                
                // <li>item</li>
                // <li>{contact.name}</li>
                // <li>{contact['name']}</li>
            ))}
        </ol>
    )
}