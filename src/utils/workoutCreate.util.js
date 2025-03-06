import { WORKOUT_CONFIG, BASE_TARGETS } from "../constants/workout.constants";
import { exerciseService } from "../services/exercise.service";

export function createWorkoutByTag(tag, difficulty) {
    const exercises = exerciseService.getExercisesFromLocalStorage();
    const tagExercises = exercises.filter(exercise => exercise.tag === tag);
    
    if (tagExercises.length === 0) {
        return null;
    }

    const config = WORKOUT_CONFIG[difficulty];
    
    const sortedExercises = tagExercises.sort((a, b) => {
        const aPreferred = config.preferredComplexity.includes(a.complexity);
        const bPreferred = config.preferredComplexity.includes(b.complexity);
        return bPreferred - aPreferred;
    });

    const exerciseCount = Math.floor(
        Math.random() * (config.exerciseCount.max - config.exerciseCount.min + 1)
    ) + config.exerciseCount.min;

    const circuitExercises = [];
    const availableExercises = [...sortedExercises];
    
    for (let i = 0; i < exerciseCount && availableExercises.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableExercises.length);
        circuitExercises.push(availableExercises.splice(randomIndex, 1)[0]);
    }

    const circuits = Math.floor(
        Math.random() * (config.sets.max - config.sets.min + 1)
    ) + config.sets.min;

    const workoutExercises = [];
    for (let circuit = 0; circuit < circuits; circuit++) {
        circuitExercises.forEach(exercise => {
            workoutExercises.push({
                exerciseId: exercise.id,
                target: Math.round(BASE_TARGETS[exercise.type] * config.targetMultiplier),
                circuitNumber: circuit + 1
            });
        });
    }

    return {
        name: `${difficulty} круговая тренировка ${tag}`,
        description: `Автоматически созданная ${difficulty.toLowerCase()} круговая тренировка для группы ${tag}. Кругов: ${circuits}`,
        exercises: workoutExercises
    };
}