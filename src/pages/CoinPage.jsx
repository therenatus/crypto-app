import React, { useContext, useEffect, useState} from 'react';
import { SingleCoin } from '../config/api';
import CurrencyContext from '../CurrencyContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CoinPage = () => {
    const { id } = useParams()
    const { currency, symbol } = useContext(CurrencyContext);
    const [ coin , setCoin ] = useState([]);

    const fetchCoin = async() => {
        const { data }  = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    useEffect( () => {
        fetchCoin();
    }, [])

    return (
        <div>CoinPage
            {/* <span>{currency},  {symbol}</span> */}
            {console.log(coin)}
        </div>
    )
}
