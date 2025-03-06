import { useState } from "react";

import { Modal, message } from "antd";

import { useWorkout } from "../../context/WorkoutContext";
import { createWorkoutByTag } from "../../utils/workoutCreate.util";

import CreateTypeSelector from "./WorkoutForm/CreateTypeSelector";
import TagSelector from "./WorkoutForm/TagSelector";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

const MODAL_CONFIG = {
    add: {
        title: 'Добавить тренировку',
        submitText: 'Создать'
    },
    edit: {
        title: 'Изменить тренировку',
        submitText: 'Изменить'
    }
};

export default function WorkoutModal({ type, workout, isModalOpen, setIsModalOpen, setSelectedWorkout }) {
    const [messageApi, contextHolder] = message.useMessage();

    const { addWorkout, updateWorkout } = useWorkout();
    const [createType, setCreateType] = useState(type === 'edit' ? 'manual' : null);

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedWorkout(null);
        setCreateType(null);
    };

    const handleSubmit = (values) => {
        if (type === 'add') {
            addWorkout(values);
            messageApi.open({
                type: 'success',
                content: 'Тренировка успешно создана',
            });
        } else {
            updateWorkout(workout.id, values);
            messageApi.open({
                type: 'success',
                content: 'Тренировка успешно обновлена',
            });
        }
        handleClose();
    };

    const handleTagSelect = (tag, difficulty) => {
        const generatedWorkout = createWorkoutByTag(tag, difficulty);
        if (generatedWorkout) {
            addWorkout(generatedWorkout);
            messageApi.open({
                type: 'success',
                content: 'Тренировка успешно создана по тегу!',
            });
            handleClose();
        }
    };

    const getModalContent = () => {
        if (type === 'edit') {
            return (
                <WorkoutForm
                    onSubmit={handleSubmit}
                    initialValues={workout}
                    submitText={MODAL_CONFIG[type].submitText}
                />
            );
        }

        switch (createType) {
            case 'manual':
                return (
                    <WorkoutForm
                        onSubmit={handleSubmit}
                        submitText={MODAL_CONFIG[type].submitText}
                        onBack={() => setCreateType(null)}
                    />
                );
            case 'byTag':
                return (
                    <TagSelector
                        onGenerate={handleTagSelect}
                        onBack={() => setCreateType(null)}
                    />
                );
            default:
                return (
                    <CreateTypeSelector
                        onTypeSelect={setCreateType}
                    />
                );
        }
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
                        Создавай тренировки и достигай новых высот! 💪
                    </p>
                }
            >
                {getModalContent()}
            </Modal>
        </>
    );
}