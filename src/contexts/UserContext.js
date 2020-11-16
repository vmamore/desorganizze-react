import React, { useState, createContext, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
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