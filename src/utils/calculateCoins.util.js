export function calculateCoins(repetitions, skippedExercises, duration, levelCoefficient) {
    const baseCoins = repetitions * 2;
    const penaltyForSkipped = skippedExercises * 5;
    const durationBonus = Math.floor(duration / 60) * 0.5;
    const levelBonus = Math.floor(levelCoefficient * 12);

    const totalCoins = baseCoins - penaltyForSkipped + durationBonus + levelBonus;

    return Math.max(totalCoins, 0);
}