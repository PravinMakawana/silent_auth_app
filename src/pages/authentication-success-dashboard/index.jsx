import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'components/ui/AuthenticationStateManager';
import Icon from 'components/AppIcon';
import ProcessStatusIndicator from 'components/ui/ProcessStatusIndicator';
import SecurityContextDisplay from 'components/ui/SecurityContextDisplay';
import SessionInfoPanel from './components/SessionInfoPanel';
import BankingServicesGrid from './components/BankingServicesGrid';
import WelcomeConfirmation from './components/WelcomeConfirmation';

const AuthenticationSuccessDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authToken, sessionId, resetAuthentication } = useAuthState();
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [sessionTimer, setSessionTimer] = useState(null);

  // Mock user data
  const userData = {
    name: "Ahmad Rahman",
    accountNumber: "****-****-1234",
    lastLogin: new Date().toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    preferredLanguage: 'EN'
  };

  // Session management
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/o-auth-authentication-initiation');
      return;
    }

    // Start session timer
    const timer = setInterval(() => {
      setSessionTimer(prev => {
        if (prev === null) return 1;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, navigate]);

  const handleContinueToBanking = () => {
    // In a real app, this would navigate to the main banking dashboard
    alert(currentLanguage === 'EN' ?'Redirecting to SecureBank Malaysia main dashboard...' :'Mengalihkan ke papan pemuka utama SecureBank Malaysia...'
    );
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      currentLanguage === 'EN' ?'Are you sure you want to logout securely?' :'Adakah anda pasti mahu log keluar dengan selamat?'
    );
    
    if (confirmLogout) {
      resetAuthentication();
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'EN' ? 'MY' : 'EN');
  };

  const formatSessionDuration = (seconds) => {
    if (!seconds) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Process Status Indicator */}
        <div className="mb-8">
          <ProcessStatusIndicator />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Confirmation */}
            <WelcomeConfirmation 
              userData={userData}
              currentLanguage={currentLanguage}
              sessionTimer={sessionTimer}
              formatSessionDuration={formatSessionDuration}
            />

            {/* Session Information Panel */}
            <SessionInfoPanel 
              authToken={authToken}
              sessionId={sessionId}
              currentLanguage={currentLanguage}
              sessionTimer={sessionTimer}
              formatSessionDuration={formatSessionDuration}
            />

            {/* Banking Services Grid */}
            <BankingServicesGrid 
              currentLanguage={currentLanguage}
              onContinueToBanking={handleContinueToBanking}
            />
          </div>

          {/* Right Column - Security & Controls */}
          <div className="space-y-6">
            {/* Language Toggle */}
            <div className="auth-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  {currentLanguage === 'EN' ? 'Language / Bahasa' : 'Bahasa / Language'}
                </h3>
                <Icon name="Globe" size={20} color="#6B7280" strokeWidth={2} />
              </div>
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between p-3 border border-border rounded-md hover:bg-background transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <span className="text-sm font-medium text-text-primary font-caption">
                  {currentLanguage === 'EN' ? 'English' : 'Bahasa Malaysia'}
                </span>
                <Icon name="ChevronRight" size={16} color="#6B7280" strokeWidth={2} />
              </button>
            </div>

            {/* Security Context Display */}
            <div className="auth-card p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Shield" size={20} color="#10B981" strokeWidth={2} />
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  {currentLanguage === 'EN' ? 'Security Status' : 'Status Keselamatan'}
                </h3>
              </div>
              <SecurityContextDisplay />
            </div>

            {/* Session Controls */}
            <div className="auth-card p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Settings" size={20} color="#6B7280" strokeWidth={2} />
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  {currentLanguage === 'EN' ? 'Session Controls' : 'Kawalan Sesi'}
                </h3>
              </div>
              
              <div className="space-y-3">
                {/* Session Duration */}
                <div className="flex items-center justify-between p-3 bg-background rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} color="#6B7280" strokeWidth={2} />
                    <span className="text-sm text-text-secondary font-caption">
                      {currentLanguage === 'EN' ? 'Session Duration' : 'Tempoh Sesi'}
                    </span>
                  </div>
                  <span className="text-sm font-mono text-text-primary">
                    {formatSessionDuration(sessionTimer)}
                  </span>
                </div>

                {/* Auto Logout Warning */}
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-md">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={16} color="#F59E0B" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning font-caption">
                        {currentLanguage === 'EN' ? 'Auto Logout' : 'Log Keluar Auto'}
                      </p>
                      <p className="text-xs text-text-secondary font-caption mt-1">
                        {currentLanguage === 'EN' ?'Session will expire after 15 minutes of inactivity' :'Sesi akan tamat selepas 15 minit tidak aktif'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 p-3 border border-error text-error rounded-md hover:bg-error/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-error/20"
                >
                  <Icon name="LogOut" size={16} color="#DC2626" strokeWidth={2} />
                  <span className="text-sm font-medium font-caption">
                    {currentLanguage === 'EN' ? 'Secure Logout' : 'Log Keluar Selamat'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Notice */}
        <div className="mt-12 p-4 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="#1E3A8A" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-primary font-caption mb-2">
                {currentLanguage === 'EN' ? 'Important Security Information' : 'Maklumat Keselamatan Penting'}
              </h4>
              <p className="text-sm text-text-secondary font-caption">
                {currentLanguage === 'EN' 
                  ? `Your authentication session is secured with bank-grade encryption and monitored for compliance with Bank Negara Malaysia regulations. This session will automatically expire for your security. Never share your authentication details with anyone.`
                  : `Sesi pengesahan anda dijamin dengan penyulitan gred bank dan dipantau untuk pematuhan peraturan Bank Negara Malaysia. Sesi ini akan tamat secara automatik untuk keselamatan anda. Jangan sekali-kali berkongsi butiran pengesahan anda dengan sesiapa.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationSuccessDashboard;