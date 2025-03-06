import { useEffect, useState } from "react";

import { Input, Form, Button, Space } from "antd";

import { useExercise } from "../../../context/ExerciseContext";

import ExercisesList from './ExercisesList';
import HighLoadWarning from './HighLoadWarning';

const { TextArea } = Input;

const getExerciseType = (exerciseId, exercises) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    return exercise?.type;
};

export default function WorkoutForm({ onSubmit, initialValues, submitText, onBack }) {
    const [form] = Form.useForm();
    const { exercises } = useExercise();
    const [selectedExerciseTypes, setSelectedExerciseTypes] = useState({});
    const [highLoadFields, setHighLoadFields] = useState({});

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            const types = {};
            initialValues.exercises?.forEach((ex, index) => {
                types[index] = getExerciseType(ex.exerciseId, exercises);
            });
            setSelectedExerciseTypes(types);
        }
        return () => {
            form.resetFields();
            setSelectedExerciseTypes({});
            setHighLoadFields({});
        };
    }, [form, initialValues, exercises]);

    const handleSubmit = (values) => {
        onSubmit(values);
        setSelectedExerciseTypes({});
        setHighLoadFields({});
    };

    const handleExerciseChange = (exerciseId, fieldName) => {
        setSelectedExerciseTypes(prev => ({
            ...prev,
            [fieldName]: getExerciseType(exerciseId, exercises)
        }));
    };

    const handleTargetChange = (value, fieldName) => {
        const isTimeType = selectedExerciseTypes[fieldName] === 'На время';
        const threshold = isTimeType ? 5400 : 50;
        
        setHighLoadFields(prev => ({
            ...prev,
            [fieldName]: value >= threshold
        }));
    };

    return (
        <Form
            form={form}
            name="workout"
            onFinish={handleSubmit}
            initialValues={initialValues}
            layout="vertical"
            onValuesChange={(_, allValues) => {
                allValues.exercises?.forEach((exercise, index) => {
                    if (exercise?.target) {
                        handleTargetChange(exercise.target, index);
                    }
                });
            }}
        >
            <Form.Item
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введи название тренировки!' }]}
            >
                <Input showCount maxLength={50} placeholder="Введи название тренировки" />
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
            >
                <TextArea
                    showCount
                    maxLength={100}
                    placeholder="Добавь описание тренировки"
                    rows={2}
                />
            </Form.Item>

            <ExercisesList
                selectedExerciseTypes={selectedExerciseTypes}
                onExerciseChange={handleExerciseChange}
                onTargetChange={handleTargetChange}
                highLoadFields={highLoadFields}
            />

            <HighLoadWarning visible={Object.values(highLoadFields).some(Boolean)} />

            <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
                <Space>
                    <Button onClick={onBack}>
                        Назад
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {submitText}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
} 