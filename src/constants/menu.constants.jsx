import { CalendarOutlined, UserOutlined, HomeOutlined, HistoryOutlined } from '@ant-design/icons';

import styles from './menu.constants.module.css';

export const navItems = [
    {
        key: '/exercises',
        label: 'Упражнения',
        icon: <HomeOutlined className={styles.icon}/>
    },
    {
        key: '/workouts',
        label: 'Тренировки',
        icon: <CalendarOutlined className={styles.icon}/>
    },
    {
        key: '/history',
        label: 'История',
        icon: <HistoryOutlined className={styles.icon}/>
    },
    {
        key: '/profile',
        label: 'Персонаж',
        icon: <UserOutlined className={styles.icon}/>
    }
];