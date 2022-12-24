import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from '../api.js'

export default function WorkoutList() {
	const [workouts, setWorkouts] = useState([])
	const [exercises, setExercises] = useState([])
	const selectWorkout = async (workout) => {
		try {
			const exerciseResponse = await Promise.all(
			workout.exercises.map(async (exerciseId) => {
				return await api.getExerciseById(exerciseId)
			}))
			let names = []
			for (let i=0; i < exerciseResponse.length; i++) {
				names.push(exerciseResponse[i][1].name)
			}
			setExercises(names)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((workout) => {
		return <Text 
			key={workout.name} 
			onPress={async () => await selectWorkout(workout)}>{workout.name}</Text>
		})
	const listExercises = exercises.map((exercise) => {
		return <Text>{exercise}</Text>
		})

	return <View>
		<Text style={{fontWeight: 'bold', fontSize: 20}}>Workouts</Text>
		{listItems}
		<Text></Text>
		{listExercises}
		</View>
}
