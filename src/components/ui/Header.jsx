import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const location = useLocation();

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'EN' ? 'EN' : 'EN');
  };

  const getBankLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <Icon name="Shield" size={20} color="white" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-primary font-heading">NioPay</span>
        <span className="text-xs text-text-secondary font-caption">Philippines</span>
      </div>
    </div>
  );

  const getSessionIndicator = () => {
    if (location.pathname === '/authentication-success-dashboard') {
      return (
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-md">
          <Icon name="CheckCircle" size={16} color="#10B981" strokeWidth={2} />
          <span className="text-sm font-medium text-success">Authenticated</span>
        </div>
      );
    }
    return null;
  };

  const getSecurityIndicator = () => (
    <div className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
      <Icon name="Lock" size={16} color="#6B7280" strokeWidth={2} />
      <span className="font-caption">256-bit SSL</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-90 bg-surface border-b border-border shadow-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex-shrink-0">
            {getBankLogo()}
          </div>

          {/* Center Section - Security Indicator (Desktop) */}
          <div className="flex-1 flex justify-center">
            {getSecurityIndicator()}
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-4">
            {/* Session Indicator */}
            {getSessionIndicator()}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border bg-surface hover:bg-background transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label={`Switch to ${currentLanguage === 'EN' ? 'Bahasa Malaysia' : 'English'}`}
            >
              <Icon name="Globe" size={16} color="#6B7280" strokeWidth={2} />
              <span className="text-sm font-medium text-text-primary font-caption">
                {currentLanguage}
              </span>
              <Icon name="ChevronDown" size={14} color="#6B7280" strokeWidth={2} />
            </button>

            {/* Help/Support */}
            <button
              className="p-2 rounded-md border border-border bg-surface hover:bg-background transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Help and Support"
            >
              <Icon name="HelpCircle" size={18} color="#6B7280" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Mobile Security Indicator */}
        <div className="md:hidden pb-3 flex justify-center">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Lock" size={14} color="#6B7280" strokeWidth={2} />
            <span className="font-caption">Secure Connection • 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;