import { localStorageManager } from '../localstorage/localstorage';

import { workoutService } from './workout.service';

class ExerciseService {
    EXERCISES_KEY = 'exercises'
    URL = '/exercises.json'

    validateExercise(exercise) {
        if (!exercise || !exercise.id || !exercise.name || !exercise.type) {
            return false;
        }
        return true;
    }

    async getExercises() {
        try {
            if (!navigator.onLine) {
                throw new Error('Нет подключения к интернету');
            }

            const response = await fetch(this.URL);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке упражнений:', error);
            throw new Error('Не удалось загрузить упражнения. Попробуйте позже.');
        }
    }

    saveExercisesToLocalStorage(exercises) {
        localStorageManager.save(this.EXERCISES_KEY, exercises);
    }

    getExercisesFromLocalStorage() {
        const exercises = localStorageManager.get(this.EXERCISES_KEY) || [];
        return exercises.filter(this.validateExercise);
    }

    getExerciseByIdFromLocalStorage(id) {
        const exercise = localStorageManager.getById(this.EXERCISES_KEY, id);
        return this.validateExercise(exercise) ? exercise : null;
    }

    removeExercisesFromLocalStorage() {
        localStorageManager.remove(this.EXERCISES_KEY);
    }

    removeExerciseFromLocalStorage(id) {
        const workouts = workoutService.getWorkoutsFromLocalStorage();
        
        const updatedWorkouts = workouts.map(workout => ({
            ...workout,
            exercises: workout.exercises.filter(ex => ex.exerciseId !== id)
        }));

        const validWorkouts = updatedWorkouts.filter(workout => workout.exercises.length > 0);
        
        workoutService.saveWorkoutsToLocalStorage(validWorkouts);
        
        localStorageManager.removeById(this.EXERCISES_KEY, id);
    }

    updateExerciseInLocalStorage(id, updatedExercise) {
        if (this.validateExercise(updatedExercise)) {
            localStorageManager.updateById(this.EXERCISES_KEY, id, updatedExercise);
        }
    }

    addExerciseToLocalStorage(exercise) {
        if (this.validateExercise(exercise)) {
            localStorageManager.add(this.EXERCISES_KEY, exercise);
        }
    }
}

export const exerciseService = new ExerciseService()