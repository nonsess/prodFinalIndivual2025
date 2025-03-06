import { Form, Button } from 'antd';

import ExerciseFormItem from './ExerciseFormItem';

export default function ExercisesList({ 
    selectedExerciseTypes,
    onExerciseChange,
    onTargetChange,
    highLoadFields 
}) {
    return (
        <Form.List
            name="exercises"
            rules={[{ required: true, message: 'Добавь хотя бы одно упражнение!' }]}
        >
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
                        <ExerciseFormItem
                            key={field.key}
                            field={field}
                            remove={remove}
                            selectedExerciseTypes={selectedExerciseTypes}
                            onExerciseChange={onExerciseChange}
                            onTargetChange={onTargetChange}
                            highLoadFields={highLoadFields}
                        />
                    ))}
                    
                    <Button type="dashed" onClick={() => add()} block>
                        Добавить упражнение
                    </Button>
                </>
            )}
        </Form.List>
    );
} 