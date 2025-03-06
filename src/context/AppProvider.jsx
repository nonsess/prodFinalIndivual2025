import { ExerciseContextProvider } from './ExerciseContext';
import { GameContextProvider } from './GameContext';
import { WorkoutContextProvider } from './WorkoutContext';

export function AppProvider({ children }) {
    return (
        <ExerciseContextProvider>
            <WorkoutContextProvider>
                <GameContextProvider>
                    {children}
                </GameContextProvider>
            </WorkoutContextProvider>
        </ExerciseContextProvider>
    );
}