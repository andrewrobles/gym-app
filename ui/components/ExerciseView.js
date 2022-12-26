import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import api from '../api.js'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	header: {
		fontWeight: "bold",
		fontSize: 20,
	},
	editButton: {
		marginLeft: 'auto',
		bottom: 11,
	},
	deleteButton: {
		bottom: 11,
	}
})

const ExerciseList = () => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		api.getExercises()
		.then((data) => setExercises(data))
	})

	return <View>
		<Text style={styles.header}>Exercises</Text>
		{exercises.map((exercise) => <View key={exercise._id} style={styles.container}>
			<Text key={exercise.name}>{exercise.name}</Text>
			<View style={styles.editButton}>
				<Button 
				title="Edit"
				onPress={() => api.deleteExerciseById(exercise._id)}/>
			</View>
			<View style={styles.deleteButton}>
				<Button 
				title="Delete"
				onPress={() => api.deleteExerciseById(exercise._id)}/>
			</View>
		</View>)}
	</View>
}

const AddExerciseForm = () => {
	const [textInputValue, setTextInputValue] = useState('');
	
	const submitAndClearForm = async () => {
		try {
			await api.addExercise(textInputValue)
			setTextInputValue('')
		} catch (error) {
			console.log(error)
		}	
	}

	return (
		<View>
			<Text style={styles.header}>Add Exercise</Text>
			<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setTextInputValue(text)}
			value={textInputValue}
			placeholder=" Exercise name"/>
			<Button
			title="Save"
			onPress={async () => await submitAndClearForm()}/>
		</View>
  );
}

const EditExerciseForm = () => {
	const [textInputValue, setTextInputValue] = useState('');
	
	const submitAndClearForm = async () => {
		try {
			await api.updateExercise(textInputValue)
			setTextInputValue('')
		} catch (error) {
			console.log(error)
		}	
	}

	return (
		<View>
			<Text style={styles.header}>Edit Exercise</Text>
			<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setTextInputValue(text)}
			value={textInputValue}
			placeholder=" Exercise name"/>
			<Button
			title="Save"
			onPress={async () => await submitAndClearForm()}/>
		</View>
  );
}

export default function Exercises() {
	return <View>
		<AddExerciseForm/>
		<ExerciseList/>
	</View>
}
