import React, { createContext, useEffect, useState } from 'react';

const Currency = createContext();

export const CurrencyProvider = ({children}) => {

    const [ currency, setCurrency] = useState("USD")
    const [ symbol, setSymbol] = useState("$")

    useEffect(() => {
        if(currency === 'USD'){
            setSymbol('$')
        }
        if(currency === 'EUR'){
            setSymbol('e')
        }
    })

    return (
        <Currency.Provider>{children}</Currency.Provider>
    )
}

