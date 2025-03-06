import { useState } from 'react';

import { Layout, FloatButton, Button } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

import AppContent from '../../components/AppContent/AppContent';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import WorkoutModal from '../../components/WorkoutModal/WorkoutModal';

import styles from './Workouts.module.css';

export default function Workouts() {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');

    return (
        <Layout>
            <AppHeader subtitle="Тренировки" />
            <AppContent>
                <PageHeader 
                    title="Программа тренировок"
                    subtitle="Создавай тренировки сам или используй автогенерацию тренировок."
                />
                <WorkoutList
                    setSelectedWorkout={setSelectedWorkout}
                    setIsModalOpen={setIsModalOpen}
                    setModalType={setModalType}
                />
                <FloatButton
                    onClick={() => {
                        setModalType('add');
                        setIsModalOpen(true);
                    }}
                    className={styles.floatButton}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                />
                <WorkoutModal
                    type={modalType}
                    workout={selectedWorkout}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedWorkout={setSelectedWorkout}
                />
            </AppContent>
        </Layout>
    );
}