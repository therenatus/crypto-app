import React from 'react';
import { Box, styled, Typography, Stack } from '@mui/material';

import { Carousel } from './Carousel';
import img from '../../assets/images/banner.jpg';


const StyledBanner = styled(Box)(({theme}) => ({
    backgroundImage: `url(${img})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: 'calc(100vw - 17px)',
    height: '70vh',
    margin: 0,
    padding: 0
}));

const MainText = styled(Typography)(({theme}) => ({
    color: '#fff',
    fontWeight: 'bold',
    textAlign: "center"
}))

const SubTitle = styled(Typography)(({theme}) => ({
    color: 'darkgrey',
    textTransform: 'capitalize',
    width: '60%',
    textAlign: 'center'
}))
export const Banner = () => {
    return (
        <StyledBanner>
            <Stack  direction="column"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
                height="100%" 
                >

                <MainText variant='h2'>
                    Crypto App
                </MainText>
                <SubTitle variant='subtitle2'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos distinctio laborum ea totam reiciendis, quidem iure enim dolorum vitae! Consectetur nobis voluptates iusto, fuga ullam sunt amet necessitatibus maxime soluta.
                </SubTitle>
                <Carousel>
                    
                </Carousel>

            </Stack>
        </StyledBanner>
    )
}
