import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';

const WorkoutList = () => {
	const [workouts, setWorkouts] = useState([])
	const selectWorkout = () => {
		console.log('selectWorkout')
	}

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('http://localhost:5000/workout', requestOptions)
		.then(response => response.json())
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((exercise) => <Text key={exercise.name} onPress={selectWorkout}>{exercise.name}</Text>)
	return <View>
		<Text>Workouts</Text>
		{listItems}
	</View>
}

export default () => {
	return <View>
		<WorkoutList/>
	</View>
}
