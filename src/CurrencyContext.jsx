import React, { createContext, useEffect, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {

    const [ currency, setCurrency] = useState("USD")
    const [ symbol, setSymbol] = useState("$")

    const addCurrency = (currencyProps) => {
        setCurrency(currencyProps)
    }

    useEffect(() => {
        if(currency === 'USD'){
            setSymbol('$')
        }
        if(currency === 'EUR'){
            setSymbol('e')
        }
        if(currency === 'rub'){
            setSymbol('rub')
        }
    }, [currency])

    return (
        <CurrencyContext.Provider value={{currency, symbol, addCurrency}}>{children}</CurrencyContext.Provider>
    )
}

export default CurrencyContext;
