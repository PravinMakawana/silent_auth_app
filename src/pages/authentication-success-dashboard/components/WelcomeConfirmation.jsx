import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const WelcomeConfirmation = ({ userData, currentLanguage, sessionTimer, formatSessionDuration }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger success animation on mount
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getWelcomeMessage = () => {
    if (currentLanguage === 'EN') {
      return {
        title: 'Authentication Successful!',
        subtitle: `Welcome back, ${userData.name}`,
        description: 'Your secure banking session has been established successfully.',
        lastLogin: 'Last accessed',
        sessionActive: 'Session active for'
      };
    } else {
      return {
        title: 'Pengesahan Berjaya!',
        subtitle: `Selamat kembali, ${userData.name}`,
        description: 'Sesi perbankan selamat anda telah diwujudkan dengan jayanya.',
        lastLogin: 'Akses terakhir',
        sessionActive: 'Sesi aktif selama'
      };
    }
  };

  const messages = getWelcomeMessage();

  return (
    <div className="auth-card p-6 sm:p-8">
      {/* Success Animation */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4 transition-all duration-500 ${showAnimation ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <Icon 
            name="CheckCircle" 
            size={32} 
            color="#10B981" 
            strokeWidth={2}
            className={`transition-all duration-700 ${showAnimation ? 'scale-100' : 'scale-0'}`}
          />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-heading mb-2">
          {messages.title}
        </h1>
        
        <p className="text-lg text-text-secondary font-caption mb-4">
          {messages.subtitle}
        </p>
        
        <p className="text-sm text-text-secondary font-caption max-w-md mx-auto">
          {messages.description}
        </p>
      </div>

      {/* User Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-background rounded-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="#1E3A8A" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary font-caption">
              {userData.name}
            </p>
            <p className="text-xs text-text-secondary font-caption">
              {userData.accountNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Clock" size={20} color="#10B981" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary font-caption">
              {messages.lastLogin}
            </p>
            <p className="text-xs text-text-secondary font-caption">
              {userData.lastLogin}
            </p>
          </div>
        </div>
      </div>

      {/* Session Status */}
      <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="#10B981" strokeWidth={2} />
            <span className="text-sm font-medium text-success font-caption">
              {messages.sessionActive}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-text-primary">
              {formatSessionDuration(sessionTimer)}
            </span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Authentication Method */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Smartphone" size={14} color="#6B7280" strokeWidth={2} />
          <span className="font-caption">OAuth 2.0</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} color="#6B7280" strokeWidth={2} />
          <span className="font-caption">PKCE Flow</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} color="#6B7280" strokeWidth={2} />
          <span className="font-caption">Bank Grade</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeConfirmation;