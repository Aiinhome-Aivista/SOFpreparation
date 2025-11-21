import React from 'react'
import Header from './Header'

function Layout({ children }) {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <header className='w-full h-1/10 bg-[#FCFEFE]'>
                <Header />
            </header>
            <main className='w-full h-9/10 bg-[#EFFBF6]'>
                {children}
            </main>
        </div>
    )
}

export default Layout