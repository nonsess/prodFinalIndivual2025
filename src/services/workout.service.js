import { localStorageManager } from "../localstorage/localstorage"

class WorkoutService {
    URL = '/workouts.json'
    WORKOUTS_KEY = 'workouts';

    validateWorkout(workout) {
        if (!workout || !workout.id || !workout.name || !Array.isArray(workout.exercises)) {
            return false;
        }
        return true;
    }

    async getWorkouts() {
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
            console.error('Ошибка при загрузке тренировок:', error);
            throw new Error('Не удалось загрузить тренировки. Попробуйте позже.');
        }
    }

    saveWorkoutsToLocalStorage(workouts) {
        localStorageManager.save(this.WORKOUTS_KEY, workouts);
    }

    getWorkoutsFromLocalStorage() {
        const workouts = localStorageManager.get(this.WORKOUTS_KEY) || [];
        return workouts.filter(this.validateWorkout);
    }

    getWorkoutByIdFromLocalStorage(id) {
        const workout = localStorageManager.getById(this.WORKOUTS_KEY, id);
        return this.validateWorkout(workout) ? workout : null;
    }

    removeWorkoutFromLocalStorage(id) {
        localStorageManager.removeById(this.WORKOUTS_KEY, id);
    }

    updateWorkoutInLocalStorage(id, updatedWorkout) {
        if (this.validateWorkout(updatedWorkout)) {
            localStorageManager.updateById(this.WORKOUTS_KEY, id, updatedWorkout);
        }
    }

    addWorkoutToLocalStorage(workout) {
        if (this.validateWorkout(workout)) {
            localStorageManager.add(this.WORKOUTS_KEY, workout);
        }
    }
}

class WorkoutStatsService {
    WORKOUT_STATS_KEY = 'workoutStats'
    URL = '/history.json'

    async getWorkoutStats() {
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
            console.error('Ошибка при загрузке истории тренировок:', error);
            throw new Error('Не удалось загрузить историю тренировок. Попробуйте позже.');
        }
    }

    addWorkoutStatsKeyToLocalStorage() {
        localStorageManager.addKey(this.WORKOUT_STATS_KEY)
    }

    saveWorkoutStatsToLocalStorage(stats) {
        localStorageManager.save(this.WORKOUT_STATS_KEY, stats)
    }

    getWorkoutStatsFromLocalStorage() {
        return localStorageManager.get(this.WORKOUT_STATS_KEY) || [];
    }

    addWorkoutStatsToLocalStorage(stats) {
        localStorageManager.add(this.WORKOUT_STATS_KEY, stats)
    }
}

export const workoutService = new WorkoutService()

export const workoutStatsService = new WorkoutStatsService()