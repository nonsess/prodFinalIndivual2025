import { useEffect } from "react";

import { Input, Select, Form, Button } from "antd";

import { TAG_TYPES, COMPLEXITY_TYPES, EXERCISE_TYPES } from "../../../constants/exercise.constants";

const { TextArea } = Input;

/**
 * @typedef {import('../../../types/exercise.types').Exercise} Exercise
 * 
 * @typedef {Object} ExerciseFormProps
 * @property {(values: Omit<Exercise, 'id'>) => void} onSubmit
 * @property {() => void} onCancel
 * @property {Exercise} [initialValues]
 * @property {string} submitText
 */

/** @param {ExerciseFormProps} props */
export default function ExerciseForm({ onSubmit, onCancel, initialValues, submitText }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
        return () => form.resetFields();
    }, [form, initialValues]);

    const handleSubmit = (values) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
        >
            <Form.Item
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Заполни это поле!' }]}
            >
                <Input
                    placeholder="Напиши название упражнения"
                    showCount
                    maxLength={50}
                />
            </Form.Item>

            <Form.Item
                label="Тип упражнения"
                name="type"
                rules={[{ required: true, message: 'Укажи тип упражнения!' }]}
            >
                <Select placeholder="Укажи тип упражнения">
                    {EXERCISE_TYPES.map((type) => (
                        <Select.Option key={type} value={type}>{type}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Сложность"
                name="complexity"
                rules={[{ required: true, message: 'Выбери из списка!' }]}
            >
                <Select placeholder="Выбери сложность упражнения">
                    {COMPLEXITY_TYPES.map((complexity) => (
                        <Select.Option value={complexity} key={complexity}>{complexity}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Оборудование"
                name="equipment"
                rules={[{ required: true, message: 'Заполни это поле!' }]}
            >
                <TextArea
                    showCount
                    maxLength={70}
                    placeholder="Подумай какое оборудование нужно"
                    rows={1}
                />
            </Form.Item>

            <Form.Item
                label="Инструкция"
                name="instruction"
            >
                <TextArea
                    showCount
                    maxLength={100}
                    placeholder="Напиши примерную инструкцию по технике, либо оставь поле пустым"
                    rows={2}
                />
            </Form.Item>
            
            <Form.Item
                label="Тег"
                name="tag"
                rules={[{ required: true, message: 'Выбери хотя бы один тег!' }]}
            >
                <Select placeholder="Выбери тег для упражнения">
                    {TAG_TYPES.map((tag) => (
                        <Select.Option key={tag} value={tag}>{tag}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    {submitText}
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                    Отмена
                </Button>
            </Form.Item>
        </Form>
    );
} 