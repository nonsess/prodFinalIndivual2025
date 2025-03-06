import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFitness } from '../context/FitnessContext';

export function useValidateWorkout(workout) {
    const { deleteWorkout, exercises } = useFitness();
    const navigate = useNavigate();

    if (!workout) {
        return [];
    }

    const validExercises = workout.exercises
        .map(exercise => {
            const exerciseDetails = exercises.find(ex => ex.id === exercise.exerciseId);
            return exerciseDetails ? { ...exerciseDetails, target: exercise.target } : null;
        })
        .filter(exercise => exercise !== null);

    useEffect(() => {
        if (workout && validExercises.length === 0) {
            deleteWorkout(workout.id);
            navigate('/workouts');
        }
    }, [validExercises.length, workout, deleteWorkout, navigate]);

    console.log('validExercises', validExercises);

    return validExercises;
}