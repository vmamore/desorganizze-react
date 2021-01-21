import React, { useState, createContext, useContext } from 'react';
import { key } from '../utils/app-keys';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    // const [userLocalStorage, setUserLocalStorage] = useLocalStorage(key, {});
    
    const [user, setUser] = useState({
        name: '',
        username: '',
        token: '',
        authenticated: false
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    const { user, setUser } = context;
    return { user, setUser };
}

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}