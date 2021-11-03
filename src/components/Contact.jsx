import React from "react";

export default function Contact({contact}){
    const { name } = contact
    return <li>{name}</li>
}