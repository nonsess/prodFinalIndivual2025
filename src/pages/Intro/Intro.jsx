import { useEffect } from 'react';

import { Layout, Button } from 'antd';

import { useNavigate } from 'react-router-dom';

import AppContent from '../../components/AppContent/AppContent';
import AppHeader from '../../components/AppHeader/AppHeader';

import styles from './Intro.module.css';

export default function Intro() {
  const hasSeenIntro = localStorage.getItem('hasSeenIntro');
  const navigate = useNavigate();
  
  useEffect(() => {
    if(hasSeenIntro){
      navigate('/exercises')
    }
  }, [hasSeenIntro, navigate]);

  const handleStart = () => {
    localStorage.setItem('hasSeenIntro', true);
    navigate('/exercises');
  };

  return (
    <Layout>
      <AppHeader subtitle="Знакомство"/>
      <AppContent
        intro
      >
        <div className={styles.introContainer}>
          <div className={styles.welcomeText}>
            <h1 className={styles.title}>
              Добро пожаловать в Про-фитнес
              <span className={styles.emoji}>🚀</span>
            </h1>
            <p className={styles.description}>
              Привет, чемпион! Ты находишься в своем личном штабе для идеальных тренировок.
            </p>
            <p className={styles.description}>
              Здесь ты сможешь:
            </p>
            <p className={styles.description}>
              <span className={styles.highlight}>✨ Создавать</span> уникальные планы тренировок<br />
              <span className={styles.highlight}>💪 Прокачивать</span> себя каждый день<br />
              <span className={styles.highlight}>🎯 Открывать</span> новые упражнения<br />
            </p>
            <p className={styles.description}>
              Готов стать лучшей версией себя?
            </p>
          </div>
          <Button
            type="primary"
            className={styles.startButton}
            onClick={handleStart}
          >
            Готов, поехали! 🔥
          </Button>
        </div>
      </AppContent>
    </Layout>
  );
}