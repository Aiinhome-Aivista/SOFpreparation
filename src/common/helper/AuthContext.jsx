import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [modalState, setModalState] = useState(null); // can be 'login', 'register', or null

    const openLoginModal = () => setModalState('login');
    const openRegisterModal = () => setModalState('register');
    const closeModal = () => setModalState(null);

    const value = {
        modalState,
        openLoginModal,
        openRegisterModal,
        closeModal,
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