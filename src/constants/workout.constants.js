export const WORKOUT_DIFFICULTY = {
    EASY: 'Легкая',
    MEDIUM: 'Средняя',
    HARD: 'Сложная'
};

export const WORKOUT_CONFIG = {
    [WORKOUT_DIFFICULTY.EASY]: {
        exerciseCount: { min: 2, max: 3 },
        preferredComplexity: ['Легкая'],
        targetMultiplier: 0.7,
        sets: { min: 1, max: 2 }
    },
    [WORKOUT_DIFFICULTY.MEDIUM]: {
        exerciseCount: { min: 3, max: 4 },
        preferredComplexity: ['Средняя', 'Легкая'],
        targetMultiplier: 1,
        sets: { min: 2, max: 3 }
    },
    [WORKOUT_DIFFICULTY.HARD]: {
        exerciseCount: { min: 4, max: 5 },
        preferredComplexity: ['Высокая', 'Средняя'],
        targetMultiplier: 1.3,
        sets: { min: 4, max: 4 }
    }
};

export const BASE_TARGETS = {
    'На время': 60,
    'На повторения': 10
}; 