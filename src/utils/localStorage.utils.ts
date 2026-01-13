
/**
 * Retrieves the value from the local storage based on the provided key.
 * 
 * @param key - The key used to retrieve the value from the local storage.
 * @returns The value associated with the provided key, or an empty string if an error occurs.
 */
export const getLocalStorage = (key: string) => {
    try {
        return localStorage.getItem(key) || "";
    } catch (error) {
        return "";
    }
}

/**
 * Removes an item from the local storage.
 * 
 * @param key - The key of the item to be removed.
 */
export const removeLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        return;
    }
}

/**
 * Sets a value in the local storage with the specified key.
 * 
 * @param key - The key to set in the local storage.
 * @param value - The value to set in the local storage.
 */
export const setLocalStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return;
    }
}

/**
 * Clears the local storage.
 */
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        return;
    }
}