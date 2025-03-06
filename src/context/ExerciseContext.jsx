import { createContext, useContext, useEffect, useState, useCallback } from "react"

import { exerciseService } from "../services/exercise.service"

export const ExerciseContext = createContext({
    exercises: [],
    error: null,
    addExercise: () => {},
    deleteExercise: () => {},
    updateExercise: () => {},
});

export function ExerciseContextProvider({ children }) {
    const [exercises, setExercises] = useState([])

    const [error, setError] = useState(null)
    
    const [initialized, setInitialized] = useState(false)

    const mapExercise = useCallback((exercise) => {
        const lastExercise = exercises[exercises.length - 1]
        const newId = lastExercise ? lastExercise.id + 1 : 1
        return { ...exercise, id: newId }
    }, [exercises])

    const addExercise = useCallback((newExercise) => {
        const exerciseWithId = mapExercise(newExercise)
        exerciseService.addExerciseToLocalStorage(exerciseWithId)
        setExercises(prev => [...prev, exerciseWithId])
    }, [mapExercise])

    const updateExercise = useCallback((exerciseId, updatedExercise) => {
        exerciseService.updateExerciseInLocalStorage(exerciseId, updatedExercise)
        setExercises(prev => prev.map(e => e.id === exerciseId ? updatedExercise : e))
    }, [])

    const deleteExercise = useCallback((exerciseId) => {
        exerciseService.removeExerciseFromLocalStorage(exerciseId);
        setExercises(prev => prev.filter(e => e.id !== exerciseId));
    }, []);

    useEffect(() => {
        async function preload() {
            try {
                const storedExercises = exerciseService.getExercisesFromLocalStorage();
                
                const isFirstLoad = !localStorage.getItem('isExerciseInitialized');
                
                if (storedExercises.length === 0 && isFirstLoad) {
                    const result = await exerciseService.getExercises();
                    if (result) {
                        exerciseService.saveExercisesToLocalStorage(result);
                        setExercises(result);
                    }
                } else {
                    setExercises(storedExercises);
                }

                localStorage.setItem('isExerciseInitialized', 'true');
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

    return (<ExerciseContext.Provider
        value={{
            exercises,
            addExercise,
            deleteExercise,
            updateExercise,
        }}
    >
        {children}
    </ExerciseContext.Provider>)
}

export function useExercise() {
    return useContext(ExerciseContext)
}