import React, { useState } from 'react';
import { Trophy, LogOut, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../helper/AuthContext';
import { Button } from '../../components/ui/button';
import { useLocation } from 'react-router-dom';

function Header() {
  const { user, openLogoutModal, openLoginModal, openRegisterModal, openAddChildModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Trophy className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-blue-900 font-bold leading-tight">SOF Prep</h1>
              <p className="text-xs text-green-600 font-medium leading-tight">Excellence Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#subjects" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Subjects</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
            </nav>
          )}

          {/* Auth/User Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-semibold text-blue-900 mr-2">Hi, {user.name}</span>
                {user.role === 'parent' && (
                  <Button onClick={openAddChildModal} variant="outline" className="flex items-center gap-2 h-9">
                    <UserPlus className="size-4" />
                    Add Child
                  </Button>
                )}
                <Button onClick={openLogoutModal} variant="ghost" className="flex items-center gap-2 h-9 text-gray-600">
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={openLoginModal} variant="outline" className="h-9 border-gray-300">
                  Login
                </Button>
                <Button onClick={openRegisterModal} className="h-9 bg-blue-600 hover:bg-blue-700">
                  Get Started Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col gap-4">
              {isLandingPage && (
                <>
                  <a href="#features" className="text-gray-700 px-2 py-1">Features</a>
                  <a href="#subjects" className="text-gray-700 px-2 py-1">Subjects</a>
                  <a href="#pricing" className="text-gray-700 px-2 py-1">Pricing</a>
                  <a href="#testimonials" className="text-gray-700 px-2 py-1">Reviews</a>
                </>
              )}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                   <Button onClick={openLogoutModal} variant="outline" className="w-full justify-start gap-2">
                    <LogOut className="size-4" /> Logout
                   </Button>
                ) : (
                  <>
                    <Button onClick={openLoginModal} variant="outline" className="w-full">Login</Button>
                    <Button onClick={openRegisterModal} className="w-full bg-blue-600 text-white">Get Started Free</Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;