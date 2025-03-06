class LocalStorageManager {
    constructor() {
        this.isAvailable = this._checkLocalStorageAvailability();
    }
    
    _checkLocalStorageAvailability() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            console.error('LocalStorage недоступен:', e);
            return false;
        }
    }

    _handleStorageError(operation) {
        if (!this.isAvailable) {
            throw new Error('LocalStorage недоступен');
        }
        try {
            return operation();
        } catch (error) {
            console.error('Ошибка при работе с localStorage:', error);
            throw new Error('Не удалось сохранить данные');
        }
    }

    save(key, data) {
        return this._handleStorageError(() => {
            localStorage.setItem(key, JSON.stringify(data));
        });
    }

    get(key) {
        return this._handleStorageError(() => {
            return JSON.parse(localStorage.getItem(key));
        });
    }

    add(key, item) {
        return this._handleStorageError(() => {
            const data = this.get(key);
            data.push(item);
            this.save(key, data);
        });
    }

    remove(key) {
        return this._handleStorageError(() => {
            localStorage.removeItem(key);
        });
    }

    getById(key, id) {
        return this._handleStorageError(() => {
            const data = this.get(key);
            return data.find(item => item.id === id);
        });
    }

    removeById(key, id) {
        return this._handleStorageError(() => {
            const data = this.get(key);
            const updatedData = data.filter(item => item.id !== id);
            this.save(key, updatedData);
        });
    }

    updateById(key, id, updatedItem) {
        return this._handleStorageError(() => {
            const data = this.get(key);
            const updatedData = data.map(item => item.id === id ? updatedItem : item);
            this.save(key, updatedData);
        });
    }
}

export const localStorageManager = new LocalStorageManager();