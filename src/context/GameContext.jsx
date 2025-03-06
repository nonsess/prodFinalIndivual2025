import { createContext, useContext, useEffect, useState, useCallback } from "react"

import { coinsService } from "../services/coins.service"
import { levelService } from "../services/level.service"

export const GameContext = createContext({
    coins: [],
    level: 0,
    levels: [],
    error: null,
    levelCoefficient: 1,
    increaseCoins: () => {},
    decreaseCoins: () => {},
    increaseLevel: () => {},
});

export function GameContextProvider({ children }) {
    const [coins, setCoins] = useState([])
    const [level, setLevel] = useState(0)
    const [levels, setLevels] = useState([])
    const [levelCoefficient, setLevelCoefficient] = useState(1)
    const [error, setError] = useState(null)
    
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        async function preload() {
            try {
                const storedCoins = coinsService.getCoins();
                const storedLevel = levelService.getLevelFromLocalStorage();
                const storedLevels = levelService.getLevelsFromLocalStorage();
                const storedLevelCoefficient = levelService.getLevelCoefficientFromLocalStorage();
                const isFirstLoad = !localStorage.getItem('isCoinsInitialized');
                
                if (storedLevels.length === 0 && isFirstLoad) {
                    const levels = await levelService.getLevels();
                    levelService.saveLevelsToLocalStorage(levels);
                    setLevels(levels);
                } else {
                    setLevels(storedLevels);
                }

                if (!storedCoins && isFirstLoad) {
                    const result = coinsService.getCoins();
                    if (result) {
                        coinsService.saveCoinsToLocalStorage(result);
                        setCoins(result);
                    }
                } else {
                    setCoins(storedCoins);
                }

                if (!storedLevel && isFirstLoad) {
                    setLevel(0);
                    levelService.setLevelToLocalStorage(0);
                } else {
                    setLevel(storedLevel);
                }

                if (!storedLevelCoefficient && isFirstLoad) {
                    setLevelCoefficient(1);
                    levelService.setLevelCoefficientToLocalStorage(1);
                } else {
                    setLevelCoefficient(storedLevelCoefficient);
                }

                localStorage.setItem('isCoinsInitialized', 'true');
            } catch (error) {
                setError(error);
            } finally {
                setInitialized(true);
            }
        }
        preload();
    }, []);

    const increaseCoins = useCallback((amount) => {
        coinsService.increaseCoins(amount);
        setCoins(prev => prev + amount);
    }, []);

    const decreaseCoins = useCallback((amount) => {
        coinsService.decreaseCoins(amount);
        setCoins(prev => prev - amount);
    }, []);

    const increaseLevel = useCallback((level) => {
        setLevel(level + 1);
        setLevelCoefficient(levels[level + 1].coefficient);
        levelService.setLevelToLocalStorage(level + 1);
        levelService.setLevelCoefficientToLocalStorage(levels[level + 1].coefficient);
    }, [levels]);

    const editLevelCoefficient = useCallback((coefficient) => {
        setLevelCoefficient(coefficient);
        levelService.setLevelCoefficientToLocalStorage(coefficient);
    }, []);

    if (initialized && error) {
        throw error;
    }

    return (<GameContext.Provider
        value={{
            coins,
            increaseCoins,
            decreaseCoins,
            level,
            levels,
            levelCoefficient,
            increaseLevel,
            editLevelCoefficient,
        }}
    >
        {children}
    </GameContext.Provider>)
}

export function useGame() {
    return useContext(GameContext)
}