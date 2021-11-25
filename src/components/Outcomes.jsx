import React from 'react'

export default function Outcomes({outcomes}) {
    return (
        <div>
            <ol>
                {
                    outcomes.map((outcome)=> <li key={outcome._id}>{outcome.value}</li> )
                }
            </ol>
        </div>
    )
}
