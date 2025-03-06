import { Modal, message } from "antd";

import { useExercise } from "../../context/ExerciseContext";

import ExerciseForm from "./ExerciseForm/ExerciseForm";

/**
 * @typedef {Object} ExerciseModalProps
 * @property {'add' | 'edit'} type
 * @property {import('../../types/exercise.types').Exercise} [exercise]
 * @property {boolean} isModalOpen
 * @property {(open: boolean) => void} setIsModalOpen
 * @property {(exercise: import('../../types/exercise.types').Exercise | null) => void} setSelectedExercise
 */

const MODAL_CONFIG = {
    add: {
        title: 'Добавить упражнение',
        submitText: 'Добавить'
    },
    edit: {
        title: 'Изменить упражнение',
        submitText: 'Изменить'
    }
};

/** @param {ExerciseModalProps} props */
export default function ExerciseModal({ type, exercise, isModalOpen, setIsModalOpen, setSelectedExercise }) {
    const { addExercise, updateExercise } = useExercise();
    const [messageApi, contextHolder] = message.useMessage();
    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedExercise(null);
    };

    const handleSubmit = (values) => {
        if (type === 'add') {
            addExercise(values);
            messageApi.open({
                type: 'success',
                content: 'Упражнение успешно создано',
            });
        } else {
            updateExercise(exercise.id, { ...values, id: exercise.id });
            messageApi.open({
                type: 'success',
                content: 'Упражнение успешно обновлено',
            });
        }
        handleClose();
    };

    const config = MODAL_CONFIG[type];

    return (
        <>
            {contextHolder}
            <Modal
                open={isModalOpen}
                onCancel={handleClose}
                title={config.title}
                centered
                width="100%"
                style={{ maxWidth: '500px', margin: '0 auto' }}
                footer={
                    <p style={{ textAlign: 'center' }}>
                        Каждое изученое упражнение - твой ключ к успеху!
                    </p>
                }
            >
                <ExerciseForm
                    onSubmit={handleSubmit}
                    initialValues={exercise}
                    submitText={config.submitText}
                />
            </Modal>
        </>
    );
}