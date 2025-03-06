import { useState, useEffect } from 'react';

import { Card, Typography, Button, Space, Progress } from 'antd';

import { 
    StepForwardOutlined, 
    PauseOutlined, 
    PlayCircleOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ActiveExercise({ 
    exercise,
    onComplete,
    onSkip,
    onPauseToggle
}) {
    if (!exercise) return null;

    const [timeLeft, setTimeLeft] = useState(exercise.target);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timer;
        if (exercise.type === 'На время' && !isPaused && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [exercise, isPaused, timeLeft, onComplete]);

    const progress = exercise.type === 'На время'
        ? ((exercise.target - timeLeft) / exercise.target) * 100
        : 0;

    return (
        <Card style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <Title level={3}>{exercise.name}</Title>
            <Text type="secondary">{exercise.instruction}</Text>
            
            {exercise.type === 'На время' ? (
                <>
                    <Title level={2}>{timeLeft} сек</Title>
                    <Progress percent={progress} showInfo={false} />
                    <Space>
                        <Button
                            icon={isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
                            onClick={() => {
                                setIsPaused(prev => !prev);
                                onPauseToggle();
                            }}
                        />
                        <Button 
                            type="primary" 
                            danger
                            icon={<StepForwardOutlined />}
                            onClick={() => onSkip()}
                        >
                            Пропустить
                        </Button>
                    </Space>
                </>
            ) : (
                <>
                    <Title level={2}>{exercise.target} повторений</Title>
                    <Space>
                        <Button 
                            type="primary"
                            onClick={() => onComplete()}
                        >
                            Сделал
                        </Button>
                        <Button 
                            type="primary" 
                            danger
                            icon={<StepForwardOutlined />}
                            onClick={() => onSkip()}
                        >
                            Пропустить
                        </Button>
                    </Space>
                </>
            )}
        </Card>
    );
}