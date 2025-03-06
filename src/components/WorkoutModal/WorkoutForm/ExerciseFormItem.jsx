import { Form, Select, Input, Button } from 'antd';

import { useExercise } from '../../../context/ExerciseContext';

export default function ExerciseFormItem({ 
    field, 
    remove, 
    selectedExerciseTypes,
    onExerciseChange,
    onTargetChange,
    highLoadFields 
}) {
    const { exercises } = useExercise();

    return (
        <div key={field.key} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <Form.Item
                {...(({ key, ...rest }) => rest)(field)}
                name={[field.name, 'exerciseId']}
                rules={[{ required: true, message: 'Выбери упражнение!' }]}
                style={{ flex: 2 }}
            >
                <Select 
                    showSearch
                    placeholder="Выбери упражнение"
                    onChange={(value) => onExerciseChange(value, field.name)}
                    filterOption={(input, option) =>
                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {exercises.map((exercise) => (
                        <Select.Option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            
            <Form.Item
                {...(({ key, ...rest }) => rest)(field)}
                name={[field.name, 'target']}
                rules={[{ required: true, message: 'Укажи цель!' }]}
                style={{ flex: 1, position: 'relative' }}
            >
                <Input
                    type="number"
                    placeholder="Цель"
                    min={1}
                    suffix={selectedExerciseTypes[field.name] === 'На время' ? 'сек' : 'повт'}
                    style={{
                        backgroundColor: highLoadFields[field.name] ? '#fff7e6' : undefined
                    }}
                    onChange={(e) => onTargetChange(Number(e.target.value), field.name)}
                />
            </Form.Item>

            <Button onClick={() => remove(field.name)} type="text" danger>
                Удалить
            </Button>
        </div>
    );
} 