import ExerciseCard from '../ExerciseCard/ExerciseCard';

export default function ExercisesList({ 
  exercises,
  setSelectedExercise, 
  deleteExercise, 
  isModalOpen, 
  setIsModalOpen, 
  setModalType 
}) {
  if (exercises.length === 0) {
    return (
      <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
        <h3>{'Упражнения не найдены :('}</h3>
        <p>Попробуй изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
      {exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          setSelectedExercise={setSelectedExercise}
          deleteExercise={deleteExercise}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
        />
      ))}
    </div>
  );
} 