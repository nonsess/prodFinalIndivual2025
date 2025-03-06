import { message, Spin } from 'antd';

import './ActiveLevel.css';
import { useGame } from '../../context/GameContext';

export default function ActiveLevel() {
    const { coins, decreaseCoins, level, levels, increaseLevel } = useGame();

    let coinsToShow = 0;

    if (coins) {
        coinsToShow = coins;
    }

    if (levels.length === 0) {
        return <Spin fullscreen/>
    }

    const handleLevelUp = () => {
        const nextLevel = level + 1;
        if (nextLevel < levels.length) {
            if (coins >= levels[nextLevel].requiredCoins) {
                increaseLevel(level);
                decreaseCoins(levels[nextLevel].requiredCoins);
            } else {
                message.error('Недостаточно монет для повышения уровня!');
            }
        } else {
            message.success('Поздравляем! Вы достигли максимального уровня!');
        }
    };

    const progress = level < levels.length - 1
        ? (coins / levels[level + 1].requiredCoins) * 100
        : 100;

    return (
        <div className="active-level-wrapper">
            <div className="active-level-container">
                <div className="level-image-container">
                    <img src={levels[level].image} alt={levels[level].name} />
                    <div className="level-badge">{level + 1}</div>
                </div>
                <div className="level-info">
                    <h2>{levels[level].name}</h2>
                    <p>{levels[level].description}</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="coins-info">
                        {level < levels.length - 1
                            ? `${coinsToShow}/${levels[level + 1].requiredCoins} монет до следующего уровня`
                            : 'Максимальный уровень достигнут!'
                        }
                    </p>
                    {level < levels.length - 1 && (
                        <button onClick={handleLevelUp} className="level-up-button">
                            {levels[level].buttonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}