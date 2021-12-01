import React, { useState, useEffect } from 'react'
import socket from '../helpers/Socket'

export default function Chat({username}) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        socket.emit('conectado', username)
    },[username])

    useEffect(()=>{
        socket.on('messages', message => {
            setMessages([...messages, message])
        })
        return () => {socket.off()}
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('message', username, message)
    }

    return (
        <div>
            <div>
                {messages.map(
                    (mes, i) => <div key={i}>{mes.username}: {mes.message}</div> 
                )}
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <textarea value={message} onChange={e => setMessage(e.target.value)}
                    cols="30" rows="10" 
                    placeholder="Ingresa tu mensaje">
                    </textarea>
                    <button>Enviar ✉</button>
                </form>
            </div>
        </div>
    )
}
