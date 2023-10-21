import { useState } from 'react'

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
import Checkout from './components/Checkout/Checkout'

function App() {
	const [cartIsShown, setCartIsShown] = useState(false)

	const showCartHandler = () => {
		setCartIsShown(true)
	}

	const hideCartHandler = () => {
		setCartIsShown(false)
	}

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			{cartIsShown && <Checkout />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	)
}

export default App