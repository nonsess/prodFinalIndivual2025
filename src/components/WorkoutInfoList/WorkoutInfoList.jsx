import { Card, List, Button, Space, Spin } from 'antd';

import { TrophyOutlined } from '@ant-design/icons';


import styles from './WorkoutInfoList.module.css';

export default function WorkoutInfoList({ workout, exercises, handleStartWorkout }) {
    if (!workout || !exercises) {
        return <Spin fullscreen/>;
    }

    return (
        <div className={styles.workoutContainer}>
            <h1 className={styles.title}>
                Тренировка чемпиона <TrophyOutlined className={styles.trophyIcon}/>
            </h1>

            <Card size='small' className={styles.workoutInfo} variant='borderless' title={workout.name}>
                <p className={styles.description}>{workout.description}</p>
            </Card>

            <List
                className={styles.exercisesList}
                size='small'
                dataSource={workout.exercises}
                renderItem={(exercise, index) => {
                    const exerciseDetails = exercises.find(ex => ex.id === exercise.exerciseId);
                    return (
                        <List.Item key={index} className={styles.exerciseCard}>
                            <div className={styles.exerciseInfo}>
                                <h4 className={styles.exerciseName}>
                                    {exerciseDetails ? exerciseDetails.name : 'Упражнение не найдено'}
                                </h4>
                                <p className={styles.exerciseTarget}>
                                    {exerciseDetails ? (
                                        exerciseDetails.type === 'На время' 
                                            ? `${exercise.target} сек`
                                            : `${exercise.target} повт`
                                    ) : 'Цель не указана'}
                                </p>
                            </div>
                        </List.Item>
                    );
                }}
            />
            <Space className={styles.buttonContainer}>
                <Button type="primary" size="large" onClick={handleStartWorkout}>
                    Начать тренировку 💪
                </Button>
            </Space>
        </div>
    )
}