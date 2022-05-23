import React from 'react';
import { Routes, Route} from 'react-router-dom'
import { Header } from './components/Header';
import { CoinPage } from './pages/CoinPage';
import { Home } from './pages/Home';
import { jsx, css } from "@emotion/react"

const App = () => {
	const styles = {
		App: {
			backgroundColor: '#14161a',
			minHeight: '100vh'
		}
	}
	return (
		<div style={styles.App}>
			<Header />
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/coin/:id' element={<CoinPage />} />
			</Routes>
		</ div>
	)
}

export default App