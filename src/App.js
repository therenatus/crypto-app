import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Routes, Route} from 'react-router-dom'
import { Header } from './components/Header';
import { CoinPage } from './pages/CoinPage';
import { Home } from './pages/Home';

const App = () => {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#fff'
			}
		},
		type: 'dark'
	})
	return (
		<ThemeProvider theme={darkTheme}>
			<div>
				<Header />
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/coin/:id' element={<CoinPage />} />
				</Routes>
			</div>
		</ThemeProvider>
	)
}

export default App