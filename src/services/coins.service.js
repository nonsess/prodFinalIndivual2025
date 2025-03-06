import { localStorageManager } from '../localstorage/localstorage';


class CoinsService {
    COINS_KEY = 'coins'

    getCoins() {
        return parseInt(localStorageManager.get(this.COINS_KEY) || 0)
    }

    saveCoins(amount) {
        localStorageManager.save(this.COINS_KEY, amount)
    }

    increaseCoins(amount) {
        const currentAmount = this.getCoins()
        this.saveCoins(currentAmount + amount)
    }

    decreaseCoins(amount) {
        const currentAmount = this.getCoins()
        this.saveCoins(currentAmount - amount)
    }
}

export const coinsService = new CoinsService()