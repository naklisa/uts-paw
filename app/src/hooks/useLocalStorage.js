import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useStat(() => {
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }   catch {
            return initialValue;
        }
    }
    );
    
    const setValue = (value) => {
        try {
            const valueToStore = 
                value instanceof Function ? value(storedValue) :
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error('Gagal Menyimpan ke Local Storage:', err);
        }
    };
    return [storedValue, setValue];
}

export default useLocalStorage;