import { useState, useEffect } from 'react';

import { Card, Button, Space, Typography } from 'antd';

import { MinusOutlined, PlusOutlined, StepForwardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const DEFAULT_REST_TIME = 60;
const TIME_STEP = 10;

export default function RestTimer({ onComplete, initialTime = DEFAULT_REST_TIME }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timer;
        if (!isPaused && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            onComplete();
        }
        return () => clearInterval(timer);
    }, [timeLeft, isPaused, onComplete]);

    const adjustTime = (amount) => {
        setTimeLeft(prev => Math.max(0, prev + amount));
    };

    return (
        <Card style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <Title level={3}>Отдых</Title>
            <Title level={2}>{timeLeft} сек</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button 
                    icon={<MinusOutlined />} 
                    onClick={() => adjustTime(-TIME_STEP)}
                    disabled={timeLeft <= TIME_STEP}
                    style={{ flex: '1', marginRight: '10px' }}
                >
                    {TIME_STEP} сек
                </Button>
                <Button 
                    icon={<PlusOutlined />} 
                    onClick={() => adjustTime(TIME_STEP)}
                    style={{ flex: '1' }}
                >
                    {TIME_STEP} сек
                </Button>
            </div>
            <Button 
                type="primary"
                icon={<StepForwardOutlined />}
                onClick={() => setTimeLeft(0)}
                style={{ margin: '10px 0 0 0', width: '100%' }}
            >
                Пропустить
            </Button>
        </Card>
    );
}