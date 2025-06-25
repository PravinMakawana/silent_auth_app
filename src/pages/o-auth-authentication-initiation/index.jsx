import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ProcessStatusIndicator from 'components/ui/ProcessStatusIndicator';
import SecurityContextDisplay from 'components/ui/SecurityContextDisplay';
import { useAuthState } from 'components/ui/AuthenticationStateManager';
import AuthenticationCard from './components/AuthenticationCard';
import SecurityAssurance from './components/SecurityAssurance';
import LanguageContent from './components/LanguageContent';

const OAuthAuthenticationInitiation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const navigate = useNavigate();
  const { initiateAuthentication, error, isProcessing } = useAuthState();

  useEffect(() => {
    // Simulate connection check
    const checkConnection = async () => {
      setConnectionStatus('checking');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectionStatus('secure');
    };
    
    checkConnection();
  }, []);

  const handleSecureLogin = async () => {
    if (isLoading || isProcessing) return;
    
    setIsLoading(true);
    
    try {
      // Simulate OAuth parameter preparation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Initiate authentication flow
      await initiateAuthentication();
      
    } catch (error) {
      console.error('Authentication initiation failed:', error);
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'EN' ? 'MY' : 'EN');
  };

  const getConnectionStatusDisplay = () => {
    switch (connectionStatus) {
      case 'checking':
        return {
          icon: 'Loader',
          text: currentLanguage === 'EN' ? 'Establishing Secure Connection...' : 'Mewujudkan Sambungan Selamat...',
          color: 'text-warning',
          bgColor: 'bg-warning/5',
          borderColor: 'border-warning/20',
          iconColor: '#F59E0B',
          animate: true
        };
      case 'secure':
        return {
          icon: 'Shield',
          text: currentLanguage === 'EN' ? 'Secure Connection Established' : 'Sambungan Selamat Diwujudkan',
          color: 'text-success',
          bgColor: 'bg-success/5',
          borderColor: 'border-success/20',
          iconColor: '#10B981',
          animate: false
        };
      default:
        return {
          icon: 'AlertTriangle',
          text: currentLanguage === 'EN' ? 'Connection Error' : 'Ralat Sambungan',
          color: 'text-error',
          bgColor: 'bg-error/5',
          borderColor: 'border-error/20',
          iconColor: '#DC2626',
          animate: false
        };
    }
  };

  const connectionDisplay = getConnectionStatusDisplay();

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Process Status Indicator */}
          <div className="mb-8">
            <ProcessStatusIndicator />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Authentication Section */}
            <div className="lg:col-span-2">
              {/* Connection Status */}
              <div className={`mb-6 p-4 ${connectionDisplay.bgColor} border ${connectionDisplay.borderColor} rounded-md`}>
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={connectionDisplay.icon} 
                    size={20} 
                    color={connectionDisplay.iconColor} 
                    strokeWidth={2}
                    className={connectionDisplay.animate ? 'animate-spin' : ''}
                  />
                  <span className={`text-sm font-medium font-caption ${connectionDisplay.color}`}>
                    {connectionDisplay.text}
                  </span>
                  {connectionStatus === 'secure' && (
                    <div className="flex items-center space-x-1 ml-auto">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs text-text-secondary font-caption">
                        {currentLanguage === 'EN' ? 'Live' : 'Langsung'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Language Content */}
              <LanguageContent currentLanguage={currentLanguage} />

              {/* Authentication Card */}
              <AuthenticationCard
                currentLanguage={currentLanguage}
                isLoading={isLoading}
                isProcessing={isProcessing}
                connectionStatus={connectionStatus}
                onSecureLogin={handleSecureLogin}
                error={error}
              />

              {/* Security Assurance */}
              <SecurityAssurance currentLanguage={currentLanguage} />
            </div>

            {/* Security Context Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SecurityContextDisplay />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Toggle FAB - Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={toggleLanguage}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150"
          aria-label={`Switch to ${currentLanguage === 'EN' ? 'Bahasa Malaysia' : 'English'}`}
        >
          <span className="text-sm font-semibold font-caption">{currentLanguage}</span>
        </button>
      </div>
    </div>
  );
};

export default OAuthAuthenticationInitiation;