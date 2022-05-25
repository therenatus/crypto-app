import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, Typography, Box, styled, TableContainer, TableHead, Table, TableRow, TableCell, LinearProgress, TableBody, Pagination } from '@mui/material';
import axios from 'axios';

import { CoinList } from '../config/api';
import CurrencyContext from '../CurrencyContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Input = styled(TextField)(({theme}) => ({
    width: '100%',
    m: 0,
    p: 0,
    mb: '20px',
}))

const StyledPagination = styled(Pagination)(({theme}) => ({
    color: 'gold',
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& .MuiPaginationItem-root": {
        color: "gold",
      },

}))


export const CoinsTable = () => {
    
    const [coinsList, setCoinsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
    const { currency, symbol } = useContext(CurrencyContext);
    
    const fetchCoinList = async() => {
        setIsLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setIsLoading(false);
        setCoinsList(data)
    };
    
    const handleSearch = () => {
        return coinsList.filter((coin) => 
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
        )
    }

    
    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    useEffect(() => {
        fetchCoinList();
    }, [currency])

    return (
        <Container >
            <Typography variant="h4" color="white" sx={{textAlign: 'center', mt: '30px', mb: '30px'}}>
                Cryptocurrency Prices by Market Cap
            </Typography>

            <Input
                label='Search for a Crypto Currency...'
                onChange={(e) => setSearch(e.target.value)}>
            </Input>

            <TableContainer sx={{width: "100%", mt: '20px'}}>
                {isLoading ? <LinearProgress style={{ backgroundColor: "gold" }}/> : (
                    <Table>
                        <TableHead sx={{backgroundColor: '#EEBC1D'}}>
                            <TableRow>
                                {['Coin', 'Price', '24h Change', 'Market Cap'].map((item) => {
                                    return (
                                        <TableCell
                                            align={item === 'Coin' ? 'left' : 'right'}
                                            key={item}
                                            sx={{
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {item}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((page -1)*10, (page-1)*10 +10)
                            .map((coin, index) => {
                                let profit = coin.price_change_percentage_24h >= 0;
                                return (
                                    <TableRow key={`${coin}__${index}`}>
                                        <TableCell
                                        align='left'
                                        onClick={navigate(`/coin/${coin.id}`)}
                                        
                                        >
                                            <Link  key={`${coin}__${index}`} to={`/coin/${coin.id}`}>
                                                <Box sx={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                                    <img src={coin?.image} alt={coin.name} height='50px'/>
                                                    <Box sx={{ml: '20px'}}>
                                                        <Typography variant='h6'>{coin.symbol.toUpperCase()}</Typography>
                                                        <Typography elements='p' sx={{color: 'grey'}}>{coin.name}</Typography>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                        align='right'>
                                            {`${symbol} ${numberWithCommas(coin.current_price)}`}
                                        </TableCell>
                                        <TableCell
                                        align='right'
                                        style={{ color: profit ? 'rgb(14, 203, 129)' : 'red'}}>
                                            {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}% 
                                        </TableCell>
                                        <TableCell
                                        align='right'>
                                            {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                                        </TableCell>
                                        
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table> 
                )}
            </TableContainer>
            <StyledPagination 
                count={Number((coinsList.length / 10).toFixed(0))} 
                onChange={(_, index) =>{
                    setPage(index);
                    window.scroll(0, 450);
                }} />
        </Container>
    )
}
