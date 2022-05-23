import React, {useContext} from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CurrencyContext from '../CurrencyContext';

const currencies = [
    { value: 'USD', label: 'USD'},
    { value: 'EUR', label: 'EUR'},
    { value: 'RUB', label: 'RUB'}
];

const StyledTypography = styled(Typography)(({theme}) => ({
    color: 'gold',
    fontWeight: 'bold',
    cursor: 'pointer'
}))
export const Header = () => {

    const { currency, addCurrency} = useContext(CurrencyContext)
    const navigate = useNavigate();

    // const [currency, setCurrency] = useState('USD');

    const handleChange = (e) => {
        e.preventDefault();
        addCurrency(e.target.value);
    }
    return (

            <AppBar position='sticky'>
                <Toolbar>
                    <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <StyledTypography 
                            variant='h4' 
                            component='h1'
                            onClick={() => navigate('/')}>
                            Crypto
                        </StyledTypography>

                        <Select variant='outlined' 
                            value={currency} 
                            onChange={handleChange}
                            sx={{
                                width: 100,
                                height: 40,
                                backgroundColor: 'primary'
                            }}
                            >
                            {currencies.map(({value}, index) => {
                                return(
                                    <MenuItem 
                                        value={value} 
                                        key={`${index}__${value}`}
                                        // onClick={() => addCurrency(value)}
                                        >{value}</MenuItem>
                                )
                            })}
                        </Select>
                    </Container>
                </Toolbar>
            </AppBar>
    )
}
