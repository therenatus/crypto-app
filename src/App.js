import React from 'react';
import { Routes, Route} from 'react-router-dom'
import { Header } from './components/Header';
import { CoinPage } from './pages/CoinPage';
import { Home } from './pages/Home';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/coin/:id' element={<CoinPage />} />
			</Routes>
		</>
	)
}

export default App