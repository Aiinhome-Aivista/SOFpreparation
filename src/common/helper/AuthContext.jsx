import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [modalState, setModalState] = useState(null); // can be 'login', 'register', or null
    const [user, setUser] = useState(null);

    const openLoginModal = () => setModalState('login');
    const openRegisterModal = () => setModalState('register');
    const closeModal = () => setModalState(null);

    const login = (userData) => {
        setUser(userData);
        closeModal();
    };

    const logout = () => {
        setUser(null);
        // You might want to navigate to the home page after logout
        // window.location.href = '/';
    };

    const value = {
        modalState,
        openLoginModal,
        openRegisterModal,
        closeModal,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};