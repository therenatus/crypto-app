import { Box } from '@mui/material'
import React from 'react'
import { Banner } from '../components/Banner/Banner'
import { CoinsTable } from '../components/CoinsTable'

export const Home = () => {
    return (
        <Box sx={{width: '100vw', margin: 0, padding: 0}}>
            <Banner sx={{backgroundColor: 'black'}} />
            <CoinsTable />
        </Box>
    )
}
