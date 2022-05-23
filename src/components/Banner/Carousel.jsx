import React, { useContext, useEffect, useState } from 'react';
import { Container, Stack, styled, Typography, Box } from '@mui/material';
import axios from 'axios';
import { css } from '@emotion/react'

import { TrendingCoins } from '../../config/api'
import CurrencyContext from '../../CurrencyContext';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';

const StyledContainer =  styled(Container)(({theme}) => ({
    height: '50%',
    display: 'flex',
    alignItems: 'center'
}))

const StyledBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column', 
    color: 'white',
    textTransform: 'uppercase',
}))

export const  numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const { currency, symbol } = useContext(CurrencyContext);

    
    const elements = trending.map((coin) => {
        const profit = coin.price_change_percentage_24h >= 0
        return(
            <Link to={ `coin/${coin.id}`}
                key={coin.id} sx={{display: 'flex'}}>
                    <StyledBox sx={{width: 'fit'}}>
                        <img src={coin?.image}
                            alt={coin.name}
                            height='80px'
                        />
                        <Typography variant='h6'>{`${coin.symbol}   `}  
                            <span style={{ color: profit ? 'rgb(14, 203, 129)' : 'red'}}>
                                {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                        </Typography>
                        <Typography variant='h5' fontWeight='bold'>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</Typography>
                    </StyledBox>
            </Link>
        )
    });

    const fetchTrending = async() => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(() => {
        fetchTrending();
    }, [currency]);

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4,
        },
    };
    return (
        <StyledContainer>
            <AliceCarousel 
                mouseTracking
                disableButtonsControls
                disableDotsControls
                autoPlay
                autoPlayInterval={1000}
                animationDuration={1500}
                infinite
                responsive={responsive}
                items={elements}
                />
        </StyledContainer>
    )
}