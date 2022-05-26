import { Box } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import CurrencyContext from '../CurrencyContext';
import Button from './Button';
const Chart = ({coin}) => {
    const [historicData, setHistoricData] = useState([]);
    const {currency, symbol } = useContext(CurrencyContext);
    const [days, setDays ] = useState(1);

    const fetchData = async() => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices)
        console.log(historicData)
    }
    useEffect(() => {
        fetchData();
    }, [days. currency, days]);
    return (
       <>
       <Line 
            data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
       />
       <Box sx={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>

       {chartDays.map((day) => {
           return(
                <Button
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}>
                    {day.label}
                </Button>
           )
       })}
       </Box>
       </> 
    )
}

export default Chart