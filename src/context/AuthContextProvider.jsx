import React, { useState, useEffect, createContext } from 'react';


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
