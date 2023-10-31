import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

// getItemsFromBackend

const AvailableMeals = () => {
	const [meals, setMeals] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchMeals = async () => {
			setError(null)

			const response = await fetch('https://react-http-93277-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
			if (!response.ok) {
				throw new Error('Something is wrong')
			}
			const responseData = await response.json()

			const loadedMeals = []

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				})
			}

			setMeals(loadedMeals)

			setIsLoading(false)
		}

		fetchMeals().catch(error => {
			setIsLoading(false)
			setError(error.message)
		})
	}, [])
	const mealsList = meals.map(meal => (
		<MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
	))

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		)
	}

	if (error) {
		return (
			<section className={classes.MealsError}>
				<p>{error}</p>
			</section>
		)
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals
