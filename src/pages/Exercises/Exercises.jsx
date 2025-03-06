import { useState } from 'react';

import { Layout, FloatButton } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

import AppContent from '../../components/AppContent/AppContent';
import AppHeader from '../../components/AppHeader/AppHeader';
import ExerciseFilters from '../../components/ExerciseFilters/ExerciseFilters';
import ExerciseModal from '../../components/ExerciseModal/ExerciseModal';
import ExercisesList from '../../components/ExercisesList/ExercisesList';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useExercise } from '../../context/ExerciseContext';
import { useExerciseFilters } from '../../hooks/useExerciseFilters';

import styles from './Exercises.module.css';

export default function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');

  const { exercises, deleteExercise } = useExercise();
  const { handleSearch, filteredExercises } = useExerciseFilters(exercises);

  return (
    <Layout>
      <AppHeader subtitle="Упражнения" />
      <AppContent>
        <PageHeader 
          title="Библиотека упражнений"
          subtitle="Здесь собраны все твои упражнения. Используй фильтры для поиска или добавь новое упражнение с помощью кнопки внизу."
        />

        <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap', marginBottom: '24px'}}>
          <ExerciseFilters onSearch={handleSearch}/>
        </div>

        <ExercisesList
          exercises={filteredExercises}
          setSelectedExercise={setSelectedExercise}
          deleteExercise={deleteExercise}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
        />

        <FloatButton
          onClick={() => {
            setModalType('add')
            setIsModalOpen(true)
          }}
          className={styles.floatButton}
          type='primary'
          icon={<PlusCircleOutlined />}
        />
        <ExerciseModal
          type={modalType}
          exercise={selectedExercise}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedExercise={setSelectedExercise}
        />
      </AppContent>
    </Layout>
  );
}