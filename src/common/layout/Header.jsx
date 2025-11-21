import { Trophy, LogOut } from 'lucide-react'
import React from 'react';
import { useAuth } from '../helper/AuthContext';

function Header() {
  const { openLoginModal, openRegisterModal } = useAuth();

  return (
    <header className="w-full bg-[#FCFEFE] border-b border-gray-300 py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="size-8 text-blue-600" />
          <div>
            <h1 className="text-blue-900">SOF Prep Excellence</h1>
            <p className="text-sm text-[#00a63e]">Aiinhome | SPE</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button onClick={openLoginModal} className="px-2 py-1 rounded-lg border-blue-200 text-blue-700 border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer">
            Login
          </button>
          <button onClick={openRegisterModal} className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 bg-primary text-white hover:bg-primary/90 cursor-pointer">
            Register Now
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header