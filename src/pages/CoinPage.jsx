import React, { useContext, useEffect, useState} from 'react';
import { SingleCoin } from '../config/api';
import CurrencyContext from '../CurrencyContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box,CircularProgress, Container, Stack, styled, Typography } from '@mui/material';
import { FlagRounded } from '@mui/icons-material';
import Chart from '../components/Chart';

const Sidebar = styled(Box)(({theme}) => ({
    width: '30%',
    alignItems: 'center',
    borderRight: '2px solid grey',
    [theme.breakpoints.down("md")]: {
        width: '100%',
        margin: '0 auto',
        border: 'none',
        display: "flex",
        justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
        alignItems: "start",
    },
    display: 'flex',
    flexDirection: 'column',
}));

const ChartBox = styled(Box)(({theme}) => ({
    width: '65%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
        width: '95%',
        margin: '20px auto',
    }
}));

const MainBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    'a': {
        color: 'gold',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
    }
})); 

export const CoinPage = () => {
    const { id } = useParams()
    const { currency, symbol } = useContext(CurrencyContext);
    const [ coin , setCoin ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const fetchCoin = async() => {
        setIsLoading(true)
        const { data }  = await axios.get(SingleCoin(id));
        setCoin(data);
        setIsLoading(false);
        console.log(coin)
    }

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect( () => {
        fetchCoin();
    }, [])

    return (
        <Box sx={{ mt: '20px',  width: '95%', m: '20px auto'}}  >
            { isLoading ? <CircularProgress sx={{color: 'gold', ml: '50%', mt: '30vh'}}/> : (
                <MainBox>
                    <Sidebar>
                        <img src={coin?.image.large}
                            height='200'
                            style={{marginBottom: '20px'}} />
                            <Typography variant='h4' fontWeight={'bold'}>{coin?.name}</Typography>
                            <Typography dangerouslySetInnerHTML={{ __html: coin?.description.en.split('. ')[0] }} sx={{textAlign: 'justify', padding: 3}}></Typography>
                            <Stack sx={(theme) => ({display: 'flex', [theme.breakpoints.down("md")]: {
                                flexDirection: 'row'
                            }})}>
                                <Typography variant='h5'><b>Rank: </b>{coin?.market_cap_rank}</Typography>
                                <Typography variant='h5'>
                                    <b>Current Price: </b>{numberWithCommas(`${symbol} ${coin?.market_data.current_price[currency.toLowerCase()]}`)}</Typography>
                                <Typography variant='h5'>
                                    <b>Rank: </b>{numberWithCommas(
                                                    `${symbol} ${coin?.market_data.market_cap[currency.toLowerCase()]
                                                                                                                    .toString()
                                                                                                                    .slice(0, -6)}`)}M
                                </Typography>
                            </Stack>
                    </Sidebar>

                    <ChartBox>
                        <Chart coin={coin}/>
                    </ChartBox>
                </MainBox>
            )}
        </Box>
    )
}
