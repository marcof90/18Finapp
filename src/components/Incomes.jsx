import React from 'react'

export default function Incomes({incomes}) {
    return (
        <div>
            <ol>
                {
                    incomes.map(income=> <li key={income._id}>{income.value}</li>)
                }
            </ol>
        </div>
    )
}
