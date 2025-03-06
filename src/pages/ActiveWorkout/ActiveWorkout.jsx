import { useState } from 'react';

import { Layout } from 'antd';

import { useParams } from 'react-router-dom';

import ActiveExercise from '../../components/ActiveExercise/ActiveExercise';
import AppContent from '../../components/AppContent/AppContent';
import AppHeader from '../../components/AppHeader/AppHeader';
import RestTimer from '../../components/RestTimer/RestTimer';
import Workout404 from '../../components/Workout404/Workout404';
import WorkoutInfoList from '../../components/WorkoutInfoList/WorkoutInfoList';
import WorkoutStats from '../../components/WorkoutStats/WorkoutStats';
import { useExercise } from '../../context/ExerciseContext';
import { useGame } from '../../context/GameContext';
import { useWorkout } from '../../context/WorkoutContext';
import { calculateCoins } from '../../utils/calculateCoins.util';

const WORKOUT_STATES = {
    PREPARING: 'preparing',
    EXERCISING: 'exercising',
    RESTING: 'resting',
    COMPLETED: 'completed'
};

export default function ActiveWorkout() {
    const { id } = useParams();
    const { workouts, addWorkoutStats } = useWorkout();
    const { exercises } = useExercise();
    const { increaseCoins, levelCoefficient } = useGame();
    
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [workoutState, setWorkoutState] = useState(WORKOUT_STATES.PREPARING);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [skippedExercises, setSkippedExercises] = useState(0);
    
    const workout = workouts.find(w => w.id === Number(id));
    const workoutExercises = workout?.exercises.map(exercise => ({
        ...exercises.find(e => e.id === exercise.exerciseId),
        target: exercise.target
    }));
    const currentExercise = workoutExercises?.[currentExerciseIndex];

    const handleExerciseComplete = (wasSkipped = false) => {
        if (!wasSkipped && currentExercise?.type !== 'На время') {
            setTotalReps(prev => prev + currentExercise.target);
        }
        if (wasSkipped) {
            setSkippedExercises(prev => prev + 1);
        }
    
        if (currentExerciseIndex < workoutExercises.length - 1) {
            setWorkoutState(WORKOUT_STATES.RESTING);
        } else {
            const finalTotalTime = Math.floor((Date.now() - startTime) / 1000);
            const earned = calculateCoins(totalReps, skippedExercises, finalTotalTime, levelCoefficient);
            setEarnedCoins(earned);

            setTotalTime(finalTotalTime);
            setWorkoutState(WORKOUT_STATES.COMPLETED);
            
            const stats = {
                workout: workout,
                date: new Date().toISOString(),
                totalTime: finalTotalTime,
                totalReps: totalReps,
                skippedExercises: skippedExercises + (wasSkipped ? 1 : 0),
                earnedCoins: earned
            };
            
            addWorkoutStats(stats);
            increaseCoins(earned);
        }
    };

    const handleStart = () => {
        setWorkoutState(WORKOUT_STATES.EXERCISING);
        setStartTime(Date.now());
        if (currentExercise?.type === 'На время') {
            setCurrentValue(currentExercise.target);
        }
    };

    const handleRestComplete = () => {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentValue(0);
        setIsPaused(false);
        setWorkoutState(WORKOUT_STATES.EXERCISING);
    };

    const handlePauseToggle = () => {
        setIsPaused(prev => !prev);
    };

    const getContent = () => {
        switch (workoutState) {
            case WORKOUT_STATES.PREPARING:
                return (
                    <WorkoutInfoList
                        handleStartWorkout={handleStart}
                        workout={workout}
                        exercises={workoutExercises}
                    />
                );
            case WORKOUT_STATES.EXERCISING:
                return (
                    <ActiveExercise
                        exercise={currentExercise}
                        onComplete={() => handleExerciseComplete(false)}
                        onSkip={() => handleExerciseComplete(true)}
                        currentValue={currentValue}
                        isPaused={isPaused}
                        onPauseToggle={handlePauseToggle}
                    />
                );
            case WORKOUT_STATES.RESTING:
                return (
                    <RestTimer onComplete={handleRestComplete} />
                );
            case WORKOUT_STATES.COMPLETED:
                return (
                    <WorkoutStats
                        totalTime={totalTime}
                        totalReps={totalReps}
                        skippedExercises={skippedExercises}
                        earnedCoins={earnedCoins}
                    />
                );
            default:
                return null;
        }
    };

    if (!workout) {
        return (
            <Workout404 />
        );
    }

    return (
        <Layout>
            <AppHeader subtitle='Тренировка' />
            <AppContent>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                    {getContent()}
                </div>
            </AppContent>
        </Layout>
    );
}