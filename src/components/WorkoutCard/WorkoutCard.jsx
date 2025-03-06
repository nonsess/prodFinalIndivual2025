import { useEffect } from 'react';

import { Card, Space, Popconfirm, Col, Button } from 'antd';

import { DeleteOutlined, EditOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import { exerciseService } from '../../services/exercise.service';

import styles from './WorkoutCard.module.css';


export default function WorkoutCard({ workout, setSelectedWorkout, deleteWorkout, setIsModalOpen, setModalType }) {

    const navigate = useNavigate();

    const validExercises = workout.exercises.filter(exercise => {
        const exerciseDetails = exerciseService.getExerciseByIdFromLocalStorage(exercise.exerciseId);
        return exerciseDetails !== null;
    });

    useEffect(() => {
        if (validExercises.length === 0) {
            deleteWorkout(workout.id);
        }
    }, [validExercises.length, workout.id, deleteWorkout]);

    if (validExercises.length === 0) {
        return null;
    }

    return (
        <Col xs={24} md={15}>
            <Card
                title={workout.name}
                size='small'
                variant="borderless"
                role="article"
                actions={[
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={() => {
                            navigate(`/workouts/${workout.id}`);
                        }}
                        aria-label="Выполнить тренировку"
                    >
                        Начать
                    </Button>
                ]}
                aria-label={`Тренировка ${workout.name}`}
                extra={
                    <Space size={5}>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            aria-label="Редактировать тренировку"
                            onClick={() => {
                                setSelectedWorkout(workout);
                                setModalType('edit');
                                setIsModalOpen(true);
                            }}
                        />
                        <Popconfirm
                            title="Удалить тренировку?"
                            description="Это действие нельзя отменить"
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={() => deleteWorkout(workout.id)}
                        >
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                aria-label="Удалить тренировку"
                            />
                        </Popconfirm>
                    </Space>
                }
                style={{
                    width: '100%',
                    margin: '0px auto 24px',
                }}
            >
                <div className={styles.cardContent} role="contentinfo">
                    <p className={styles.description}>{workout.description}</p>
                    
                    <div className={styles.exercisesList}>
                        <h4 className={styles.exercisesTitle}>Упражнения:</h4>
                        {validExercises.map((exercise, index) => {
                            const exerciseDetails = exerciseService.getExerciseByIdFromLocalStorage(exercise.exerciseId);
                            return (
                                <div key={`${exercise.exerciseId}-${index}`} className={styles.exerciseItem}>
                                    <span className={styles.exerciseName}>
                                        {exerciseDetails.name}
                                    </span>
                                    <span className={styles.exerciseTarget}>
                                        {exerciseDetails.type === 'На время' 
                                            ? `${exercise.target} сек`
                                            : `${exercise.target} повт`
                                        }
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </Col>
    );
} 