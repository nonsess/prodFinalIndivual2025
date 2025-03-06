import { Button, Space } from 'antd';

import { EditOutlined, TagOutlined } from '@ant-design/icons';

export default function CreateTypeSelector({ onTypeSelect }) {
    return (
        <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
            <h3>Выбери способ создания тренировки</h3>
            <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => onTypeSelect('manual')}
                size="large"
                block
            >
                Создам тренировку сам
            </Button>
            <Button
                type="default"
                icon={<TagOutlined />}
                onClick={() => onTypeSelect('byTag')}
                size="large"
                block
            >
                Создать по тегу
            </Button>
        </Space>
    );
} 