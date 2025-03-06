import { localStorageManager } from '../localstorage/localstorage';

class LevelService {
    LEVEL_KEY = 'level'
    LEVEL_COEFFICIENT_KEY = 'levelCoefficient'
    LEVELS_KEY = 'levels'
    URL = '/levels.json'
    
    async getLevels() {
        try {
            const response = await fetch(this.URL);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке уровней:', error);
            return null;
        }
    }

    saveLevelsToLocalStorage(levels) {
        localStorageManager.save(this.LEVELS_KEY, levels);
    }

    getLevelsFromLocalStorage() {
        return localStorageManager.get(this.LEVELS_KEY) || [];
    }
    
    setLevelToLocalStorage(level) {
        localStorageManager.save(this.LEVEL_KEY, level);
    }
    
    getLevelFromLocalStorage() {
        return parseInt(localStorageManager.get(this.LEVEL_KEY));
    }

    setLevelCoefficientToLocalStorage(coefficient) {
        localStorageManager.save(this.LEVEL_COEFFICIENT_KEY, coefficient);
    }

    getLevelCoefficientFromLocalStorage() {
        return parseFloat(localStorageManager.get(this.LEVEL_COEFFICIENT_KEY));
    }
}

export const levelService = new LevelService();