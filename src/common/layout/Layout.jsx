import React from 'react'
import Header from './Header'
import { AuthProvider, useAuth } from '../helper/AuthContext'
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import ConfirmLogoutModal from '../modal/ConfirmLogoutModal';

function Modals() {
    const { modalState } = useAuth();
    if (modalState === 'login') return <LoginModal />;
    if (modalState === 'register') return <RegistrationModal />;
    if (modalState === 'logout') return <ConfirmLogoutModal />;
    return null;
}

function Layout({ children }) {
    return (
        <AuthProvider>
            <div className='w-full h-screen flex flex-col'>
                <Header />
                <main className='w-full grow bg-[#EFFBF6] h-full overflow-y-auto'>{children}</main>
                <Modals />
            </div>
        </AuthProvider>
    )
}

export default Layout