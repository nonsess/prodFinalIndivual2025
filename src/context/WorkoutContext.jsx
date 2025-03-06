import { createContext, useContext, useEffect, useState, useCallback } from "react"

import { exerciseService } from "../services/exercise.service"
import { workoutService, workoutStatsService } from "../services/workout.service"

export const WorkoutContext = createContext({
    workouts: [],
    workoutStats: [],
    error: null,
    addWorkout: () => {},
    deleteWorkout: () => {},
    updateWorkout: () => {},
    addWorkoutStats: () => {},
});

export function WorkoutContextProvider({ children }) {
    const [workouts, setWorkouts] = useState([])
    const [workoutStats, setWorkoutStats] = useState([])

    const [error, setError] = useState(null)
    
    const [initialized, setInitialized] = useState(false)

    const mapWorkout = useCallback((workout) => {
        const lastWorkout = workouts[workouts.length - 1]
        const newId = lastWorkout ? lastWorkout.id + 1 : 1
        return { ...workout, id: newId }
    }, [workouts])

    const addWorkout = useCallback((newWorkout) => {
        const workoutWithId = mapWorkout(newWorkout)
        workoutService.addWorkoutToLocalStorage(workoutWithId)
        setWorkouts(prev => [...prev, workoutWithId])
    }, [mapWorkout])

    const deleteWorkout = useCallback((workoutId) => {
        workoutService.removeWorkoutFromLocalStorage(workoutId)
        setWorkouts(prev => prev.filter(w => w.id !== workoutId))
    }, [])

    const updateWorkout = useCallback((workoutId, updatedWorkout) => {
        workoutService.updateWorkoutInLocalStorage(workoutId, updatedWorkout)
        setWorkouts(prev => prev.map(w => w.id === workoutId ? updatedWorkout : w))
    }, [])

    const addWorkoutStats = useCallback((newWorkoutStats) => {
        workoutStatsService.addWorkoutStatsToLocalStorage(newWorkoutStats)
        setWorkoutStats(prev => [...prev, newWorkoutStats])
    }, [])  

    useEffect(() => {
        async function preload() {
            try {
                const storedWorkouts = workoutService.getWorkoutsFromLocalStorage();
                const storedWorkoutStats = workoutStatsService.getWorkoutStatsFromLocalStorage();
                
                const isFirstLoad = !localStorage.getItem('isWorkoutInitialized');
                
                if (storedWorkouts.length === 0 && isFirstLoad) {
                    const result = await workoutService.getWorkouts();
                    if (result) {
                        workoutService.saveWorkoutsToLocalStorage(result);
                        setWorkouts(result);
                    }
                } else {
                    setWorkouts(storedWorkouts);
                }

                if (storedWorkoutStats.length === 0 && isFirstLoad) {
                    const result = await workoutStatsService.getWorkoutStats();
                    if (result) {
                        workoutStatsService.saveWorkoutStatsToLocalStorage(result);
                        setWorkoutStats(result);
                    }
                } else {
                    setWorkoutStats(storedWorkoutStats);
                }

                localStorage.setItem('isWorkoutInitialized', 'true');
            } catch (error) {
                setError(error);
            } finally {
                setInitialized(true);
            }
        }
        preload();
    }, []);

    if (initialized && error) {
        throw error;
    }

    return (<WorkoutContext.Provider
        value={{
            workouts,
            workoutStats,
            addWorkout,
            deleteWorkout,
            updateWorkout,
            addWorkoutStats
        }}
    >
        {children}
    </WorkoutContext.Provider>)
}

export function useWorkout() {
    return useContext(WorkoutContext)
}