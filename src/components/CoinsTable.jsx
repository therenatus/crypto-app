import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, ThemeProvider, Typography, Box, styled, TableContainer, TableHead, Table, TableRow, TableCell, LinearProgress, TableBody } from '@mui/material';
import axios from 'axios';

import { CoinList } from '../config/api';
import CurrencyContext from '../CurrencyContext';

const Input = styled(TextField)(({theme}) => ({
    width: '100%',
    m: 0,
    p: 0,
    mb: '20px',
}))

export const CoinsTable = () => {

    const [coinsList, setCoinsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')

    const { currency } = useContext(CurrencyContext);

    const fetchCoinList = async() => {
        setIsLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setIsLoading(false);
        setCoinsList(data)
    };

    const handleSearch = () => {
        return coinsList.filter((coin) => {
            coin.name.toLowerCase().include(search) ||
            coin.symbol.toLowerCase().includes(search)
        })
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
                                                    align={item === 'Coin' ? '' : 'right'}
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
                                    {handleSearch().map((coin) => {
                                        let profit = coin.price_change_percentage_24h >= 0;
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    {coin.name}
                                                </TableCell>
                                                <TableCell>
                                                    {coin.name}
                                                </TableCell>
                                                <TableCell>
                                                    {coin.name}
                                                </TableCell>
                                                <TableCell>
                                                    {coin.name}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )}
                </TableContainer>
            </Container>
    )
}
