import { useWorkout } from '../../context/WorkoutContext';
import WorkoutCard from '../WorkoutCard/WorkoutCard';

export default function WorkoutList({ 
    setSelectedWorkout, 
    setIsModalOpen, 
    setModalType 
}) {
    const { workouts, deleteWorkout } = useWorkout();

    if (workouts.length === 0) {
        return (
            <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                <h3>{'Тренировки не найдены :('}</h3>
                <p>Создай свою первую тренировку!</p>
            </div>
        );
    }

    return (
        <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
            {workouts.map(workout => (
                <WorkoutCard
                    key={`workout-${workout.id}`}
                    workout={workout}
                    setSelectedWorkout={setSelectedWorkout}
                    deleteWorkout={deleteWorkout}
                    setIsModalOpen={setIsModalOpen}
                    setModalType={setModalType}
                />
            ))}
        </div>
    );
} 