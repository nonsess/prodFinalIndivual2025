import { Layout } from "antd";

import AppContent from "../../components/AppContent/AppContent";
import AppHeader from "../../components/AppHeader/AppHeader";
import PageHeader from "../../components/PageHeader/PageHeader";
import WorkoutHistoryList from "../../components/WorkoutHistoryList/WorkoutHistoryList";
import { useWorkout } from "../../context/WorkoutContext";

export default function History() {
    const { workoutStats } = useWorkout();

    if (workoutStats.length === 0) {
        return (
            <Layout>
                <AppHeader subtitle="История"/>
                <AppContent>
                    <PageHeader title="История" subtitle="Здесь ты можешь просматривать историю своих выполненных тренировок."/>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <h3>История тренировок пуста</h3>
                        <p>Пока нет выполненных тренировок. Начни свою первую тренировку!</p>
                    </div>
                </AppContent>
            </Layout>
        );
    }

    return (
        <Layout>
            <AppHeader subtitle="История"/>
            <AppContent>
                <PageHeader title="История" subtitle="Здесь ты можешь просматривать историю своих выполненных тренировок."/>
                <WorkoutHistoryList />
            </AppContent>
        </Layout>
    );
}