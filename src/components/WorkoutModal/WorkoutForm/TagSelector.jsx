import { useState } from 'react';

import { Button, Select, Space } from 'antd';

import { TAG_TYPES } from '../../../constants/exercise.constants';
import { WORKOUT_DIFFICULTY } from '../../../constants/workout.constants';

export default function TagSelector({ onGenerate, onBack }) {
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const handleGenerate = () => {
        if (selectedTag && selectedDifficulty) {
            onGenerate(selectedTag, selectedDifficulty);
        }
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <h3 style={{ textAlign: 'center' }}>Настройте параметры генерации</h3>
            
            <Select
                placeholder="Выберите тег"
                style={{ width: '100%' }}
                onChange={setSelectedTag}
                value={selectedTag}
            >
                {TAG_TYPES.map(tag => (
                    <Select.Option key={tag} value={tag}>
                        {tag}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder="Выберите сложность"
                style={{ width: '100%' }}
                onChange={setSelectedDifficulty}
                value={selectedDifficulty}
            >
                {Object.values(WORKOUT_DIFFICULTY).map(difficulty => (
                    <Select.Option key={difficulty} value={difficulty}>
                        {difficulty}
                    </Select.Option>
                ))}
            </Select>

            <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button onClick={onBack}>
                    Назад
                </Button>
                <Button 
                    type="primary" 
                    onClick={handleGenerate}
                    disabled={!selectedTag || !selectedDifficulty}
                >
                    Создать
                </Button>
            </Space>
        </Space>
    );
} 