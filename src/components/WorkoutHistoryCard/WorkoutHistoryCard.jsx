import { Card } from "antd";

import { getLocaleTimeFromDate } from "../../utils/getLocaleTimeFromDate";
import { getTimeFromSeconds } from "../../utils/getTimeFromSeconds";

import styles from './WorkoutHistoryCard.module.css';

export default function WorkoutHistoryCard({ stat }) {
    const workout = stat.workout;
    const exercises = workout.exercises;
    return (
        <Card size="small" title={`${workout.name}. ${getLocaleTimeFromDate(stat.date)}`}>
            <p className={styles.infoRow}>
                <span className={styles.label}>Длительность:</span>
                <span className={styles.value}>{getTimeFromSeconds(stat.totalTime)}</span>
            </p>
            <p className={styles.infoRow}>
                <span className={styles.label}>Повторений:</span>
                <span className={styles.value}>{stat.totalReps}</span>
            </p>
            <p className={styles.infoRow}>
                <span className={styles.label}>Пропущено:</span>
                <span className={styles.value}>{stat.skippedExercises}</span>
            </p>
        </Card>
    );
}