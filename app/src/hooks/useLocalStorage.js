import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    }
    );

    const setValue = (value) => {
        try {
            const valueToStory = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStory);

            window.localStorage.setItem(key, JSON.stringify(valueToStory));
        } catch (err) {
            console.error('Gagal menyimpan ke local Storage', err);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;