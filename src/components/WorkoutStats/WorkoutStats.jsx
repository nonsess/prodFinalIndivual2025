import { Card, Typography, Button } from 'antd'

import { TrophyOutlined } from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

import { useGame } from '../../context/GameContext'

const { Title, Text } = Typography

export default function WorkoutStats({ totalTime, totalReps, skippedExercises, earnedCoins }) {
    const navigate = useNavigate()
    const { levelCoefficient } = useGame()

    return (
        <Card style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <TrophyOutlined style={{ fontSize: '48px', color: '#ffd700' }} />
            <Title level={2}>Тренировка завершена!</Title>
            <div style={{ margin: '20px 0' }}>
                <Text>Общее время: {Math.floor(totalTime / 60)} мин {totalTime % 60} сек</Text>
                <br />
                <Text>Выполнено повторений: {totalReps}</Text>
                <br />
                <Text>Пропущено упражнений: {skippedExercises}</Text>
                <br />
                <Text type="success">
                    Получено баллов: {earnedCoins}
                </Text>
            </div>
            <Button type="primary" onClick={() => navigate('/workouts')}>
                Завершить
            </Button>
        </Card>
    )
}