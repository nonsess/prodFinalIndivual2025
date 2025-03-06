import React from 'react';

import { Col } from "antd";

import { useWorkout } from "../../context/WorkoutContext";
import WorkoutHistoryCard from "../WorkoutHistoryCard/WorkoutHistoryCard";

import styles from './WorkoutHistoryList.module.css';

export default function WorkoutHistoryList() {

    const { workoutStats } = useWorkout();

    const groupedStats = workoutStats.reduce((acc, stat) => {
        const dateObj = new Date(stat.date);
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
        
        if (!acc[formattedDate]) {
            acc[formattedDate] = {
                date: dateObj,
                stats: []
            };
        }
        acc[formattedDate].stats.push(stat);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedStats).sort((a, b) => {
        return groupedStats[b].date - groupedStats[a].date;
    });

    if (groupedStats.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3>История тренировок пуста</h3>
                <p>Пока нет выполненных тренировок. Начни свою первую тренировку!</p>
            </div>
        );
    }

    return (
        <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
            <Col xs={24} md={15}>
                <div className={styles.cardContainer}>
                    {sortedDates.map(date => (
                        <div key={date} className={styles.dateBlock}>
                            <h3 className={styles.dateTitle}>{date}</h3>
                            <div className={styles.workoutList}>
                                {groupedStats[date].stats.map(stat => (
                                    <WorkoutHistoryCard key={stat.date} stat={stat}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
        </div>
    );
};