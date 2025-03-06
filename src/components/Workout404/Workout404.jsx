import { Layout, Button } from 'antd';

import { useNavigate } from 'react-router-dom';

import AppContent from '../AppContent/AppContent';
import AppHeader from '../AppHeader/AppHeader';

import styles from './Workout404.module.css';

export default function Workout404() {
    const navigate = useNavigate();

    return (
        <Layout>
            <AppHeader subtitle="Тренировка" />
            <AppContent>
                <div className={styles.workoutContainer}>
                    <h1 className={styles.title}>Тренировка не найдена</h1>
                    <Button onClick={() => navigate('/workouts')}>Назад</Button>
                </div>
            </AppContent>
        </Layout>
    )
}