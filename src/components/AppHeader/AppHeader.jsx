import React from 'react';

import { Layout } from 'antd';

import { EuroCircleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { useGame } from '../../context/GameContext';

import styles from './AppHeader.module.css';

export default function AppHeader({ subtitle }) {
    const { coins } = useGame();
    return (
        <Layout.Header className={styles.headerStyle}>
            <div className={styles.headerContent}>
                <Link to='/' style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <img 
                        src="/profitness.svg" 
                        alt="Про-фитнес лого" 
                        className={styles.logoStyle}
                    />
                    Про-фитнес
                </Link>
                <span className={styles.subtitle}> | {subtitle}</span>
                <div className={styles.coinDisplay}><EuroCircleOutlined style={{marginRight: 10}}/>{coins}</div>
            </div>
        </Layout.Header>
    );
}