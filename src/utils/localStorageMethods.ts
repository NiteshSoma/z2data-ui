interface ILocalStorageItem<T> {
    value: T;
    expiry: number;
}

/**
 * @param key 
 * @param value 
 * @param ttlInSeconds 
 */
export const setLocalStorageItem = <T>(key: string, value: T, ttlInSeconds: number): void => {
    const now = new Date();
    const item: ILocalStorageItem<T> = {
        value: value,
        expiry: now.getTime() + ttlInSeconds * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

export const getLocalStorageItem = <T>(key: string): T | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr) as ILocalStorageItem<T>;
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    } catch (error) {
        console.error("Failed to parse localStorage item:", error);
        return null;
    }
};
