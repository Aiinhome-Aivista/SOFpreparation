import React from 'react'
import Header from './Header'

function Layout({ children }) {
    return (
        <main className='w-screen h-screen flex flex-col'>
            <Header />
            {children}
        </main>
    )
}

export default Layout