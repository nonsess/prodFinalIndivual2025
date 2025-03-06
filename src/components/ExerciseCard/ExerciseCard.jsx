import { Card, Tag, Space, Popconfirm, Col, Button } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import styles from './ExerciseCard.module.css';

export default function ExerciseCard({ exercise, setSelectedExercise, deleteExercise, setIsModalOpen, setModalType }) {
    const getComplexityClass = () => {
        switch (exercise.complexity) {
            case 'Высокая':
                return styles.complexityHigh;
            case 'Средняя':
                return styles.complexityMedium;
            case 'Легкая':
                return styles.complexityLow;
            default:
                return '';
        }
    };

    return (
        <Col xs={24} md={15}>
            <Card
                title={exercise.name}
                size='small'
                variant="borderless"
                role="article"
                aria-label={`Упражнение ${exercise.name}`}
                extra={
                    <Space size={5}>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            aria-label="Редактировать упражнение"
                            onClick={() => {
                                setSelectedExercise(exercise);
                                setModalType('edit');
                                setIsModalOpen(true);
                            }}
                        />
                        <Popconfirm
                            title="Удалить упражнение?"
                            description="Это действие нельзя отменить"
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={() => deleteExercise(exercise.id)}
                        >
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                aria-label="Удалить упражнение"
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
                    <p className={`${styles.instruction} ${styles.wrapText}`}>{exercise.instruction}</p>

                    <p className={styles.infoRow}>
                        <span className={styles.label}>Сложность:</span>
                        <span className={`${styles.complexityTag} ${getComplexityClass()}`}>
                            {exercise.complexity}
                        </span>
                    </p>

                    <p className={styles.infoRow}>
                        <span className={styles.label}>Оборудование:</span>
                        <span className={`${styles.value} ${styles.wrapText}`}>{exercise.equipment}</span>
                    </p>

                    <p className={styles.infoRow}>
                        <span className={styles.label}>Тип:</span>
                        <span className={`${styles.value} ${styles.wrapText}`}>{exercise.type}</span>
                    </p>

                    <Tag className={styles.tag} color="blue" role="status">
                        {exercise.tag}
                    </Tag>
                </div>
            </Card>
        </Col>
    );
}