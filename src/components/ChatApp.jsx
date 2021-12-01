import React, {useState} from 'react'
import Chat from './Chat'

export default function ChatApp() {
    const [username, setUsername] = useState('')
    const [logued, setLogued] = useState(false)

    const onLogued = (e) => {
        e.preventDefault()
        if(username !== ""){ setLogued(true) }
    }

    return (
        <div>
            {
            !logued ?
            <form onSubmit={onLogued}>
                <input type="text" value={username} placeholder="Ingresa tu usuario"
                onChange={e => setUsername(e.target.value)} />    
                <button>Ingresar</button>
            </form>
            :<Chat username={username}/>
            }
        </div>
    )
}
