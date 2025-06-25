import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ProcessStatusIndicator from 'components/ui/ProcessStatusIndicator';
import SecurityContextDisplay from 'components/ui/SecurityContextDisplay';
import { useAuthState } from 'components/ui/AuthenticationStateManager';

const AuthenticationProcessing = () => {
  const navigate = useNavigate();
  const { processAuthentication, isProcessing, error } = useAuthState();
  const [currentStatus, setCurrentStatus] = useState('connecting');
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [language, setLanguage] = useState('EN');

  const statusMessages = {
    EN: {
      connecting: 'Connecting to secure server',
      verifying: 'Verifying credentials',
      establishing: 'Establishing secure session',
      finalizing: 'Finalizing authentication',
      success: 'Authentication successful',
      error: 'Authentication failed'
    },
    MY: {
      connecting: 'Menyambung ke pelayan selamat',
      verifying: 'Mengesahkan kelayakan',
      establishing: 'Mewujudkan sesi selamat',
      finalizing: 'Memuktamadkan pengesahan',
      success: 'Pengesahan berjaya',
      error: 'Pengesahan gagal'
    }
  };

  const processingSteps = [
    { key: 'connecting', duration: 2000, progress: 25 },
    { key: 'verifying', duration: 3000, progress: 50 },
    { key: 'establishing', duration: 2500, progress: 75 },
    { key: 'finalizing', duration: 1500, progress: 100 }
  ];

  useEffect(() => {
    let stepIndex = 0;
    let totalElapsed = 0;

    const processStep = () => {
      if (stepIndex < processingSteps.length) {
        const step = processingSteps[stepIndex];
        setCurrentStatus(step.key);
        setProgress(step.progress);

        setTimeout(() => {
          stepIndex++;
          totalElapsed += step.duration;
          processStep();
        }, step.duration);
      } else {
        // Simulate successful authentication
        handleAuthenticationSuccess();
      }
    };

    // Start processing
    processStep();

    // Timer for elapsed time
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [retryCount]);

  const handleAuthenticationSuccess = async () => {
    try {
      // Simulate OAuth callback with mock authorization code
      const mockAuthCode = 'auth_code_' + Date.now();
      const mockState = 'state_' + Date.now();
      
      await processAuthentication(mockAuthCode, mockState);
      
      setCurrentStatus('success');
      setTimeout(() => {
        navigate('/authentication-success-dashboard');
      }, 1500);
    } catch (error) {
      handleAuthenticationError(error);
    }
  };

  const handleAuthenticationError = (error) => {
    setCurrentStatus('error');
    console.error('Authentication error:', error);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setCurrentStatus('connecting');
    setProgress(0);
    setTimeElapsed(0);
  };

  const handleCancel = () => {
    navigate('/o-auth-authentication-initiation');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'MY' : 'EN');
  };

  const getStatusIcon = () => {
    switch (currentStatus) {
      case 'connecting':
        return <Icon name="Wifi" size={32} color="#1E3A8A" strokeWidth={2} className="animate-pulse" />;
      case 'verifying':
        return <Icon name="Key" size={32} color="#1E3A8A" strokeWidth={2} className="animate-bounce" />;
      case 'establishing':
        return <Icon name="Shield" size={32} color="#1E3A8A" strokeWidth={2} className="animate-pulse" />;
      case 'finalizing':
        return <Icon name="CheckCircle" size={32} color="#10B981" strokeWidth={2} />;
      case 'success':
        return <Icon name="CheckCircle" size={32} color="#10B981" strokeWidth={2} />;
      case 'error':
        return <Icon name="AlertTriangle" size={32} color="#DC2626" strokeWidth={2} />;
      default:
        return <Icon name="Loader" size={32} color="#1E3A8A" strokeWidth={2} className="animate-spin" />;
    }
  };

  const getEstimatedTime = () => {
    const totalSteps = processingSteps.length;
    const currentStepIndex = processingSteps.findIndex(step => step.key === currentStatus);
    const remainingSteps = totalSteps - currentStepIndex - 1;
    const avgStepTime = 2.25; // Average step duration in seconds
    return Math.max(0, remainingSteps * avgStepTime);
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Process Status Indicator */}
        <div className="mb-8">
          <ProcessStatusIndicator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Processing Card */}
          <div className="lg:col-span-2">
            <div className="auth-card p-8 text-center">
              {/* Bank Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Shield" size={32} color="white" strokeWidth={2} />
                </div>
              </div>

              {/* Processing Animation */}
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-border rounded-full flex items-center justify-center">
                      {getStatusIcon()}
                    </div>
                    {currentStatus !== 'error' && currentStatus !== 'success' && (
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text-secondary font-caption">
                      {language === 'EN' ? 'Progress' : 'Kemajuan'}
                    </span>
                    <span className="text-sm font-medium text-text-secondary font-caption">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary font-heading mb-2">
                  {statusMessages[language][currentStatus]}
                </h2>
                
                {currentStatus !== 'error' && currentStatus !== 'success' && (
                  <div className="space-y-2">
                    <p className="text-text-secondary font-caption">
                      {language === 'EN' ?'Please wait while we securely authenticate your session' :'Sila tunggu semasa kami mengesahkan sesi anda dengan selamat'
                      }
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} color="#6B7280" strokeWidth={2} />
                        <span className="font-caption">
                          {language === 'EN' ? 'Elapsed' : 'Berlalu'}: {formatTime(timeElapsed)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Timer" size={14} color="#6B7280" strokeWidth={2} />
                        <span className="font-caption">
                          {language === 'EN' ? 'Est.' : 'Anggaran'}: {Math.ceil(getEstimatedTime())}s
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {currentStatus === 'success' && (
                  <p className="text-success font-caption">
                    {language === 'EN' ?'Redirecting to your secure dashboard...' :'Mengalihkan ke papan pemuka selamat anda...'
                    }
                  </p>
                )}

                {currentStatus === 'error' && (
                  <div className="space-y-4">
                    <p className="text-error font-caption">
                      {language === 'EN' ?'Unable to complete authentication. Please try again.' :'Tidak dapat melengkapkan pengesahan. Sila cuba lagi.'
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={handleRetry}
                        className="auth-button-primary flex items-center justify-center space-x-2"
                      >
                        <Icon name="RotateCcw" size={16} color="white" strokeWidth={2} />
                        <span>{language === 'EN' ? 'Retry Authentication' : 'Cuba Semula'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="auth-button px-4 py-2 border border-border bg-surface text-text-primary hover:bg-background"
                      >
                        {language === 'EN' ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Language Toggle */}
              <div className="flex justify-center">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-1 rounded-md border border-border bg-surface hover:bg-background transition-colors duration-150 text-sm"
                >
                  <Icon name="Globe" size={14} color="#6B7280" strokeWidth={2} />
                  <span className="font-caption">{language === 'EN' ? 'Bahasa Malaysia' : 'English'}</span>
                </button>
              </div>

              {/* Security Assurance */}
              <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-md">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} color="#10B981" strokeWidth={2} />
                  <span className="text-sm font-medium text-success font-caption">
                    {language === 'EN' ? 'Secure Authentication' : 'Pengesahan Selamat'}
                  </span>
                </div>
                <p className="text-xs text-text-secondary font-caption">
                  {language === 'EN' ?'Your data is encrypted and protected according to Malaysian banking standards' :'Data anda disulitkan dan dilindungi mengikut piawaian perbankan Malaysia'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Security Context Sidebar */}
          <div className="lg:col-span-1">
            <div className="auth-card p-6">
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
                {language === 'EN' ? 'Security Status' : 'Status Keselamatan'}
              </h3>
              <SecurityContextDisplay />
            </div>
          </div>
        </div>

        {/* Technical Details - Development Mode */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-warning/5 border border-warning/20 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Code" size={16} color="#F59E0B" strokeWidth={2} />
              <span className="text-sm font-medium text-warning font-caption">
                Development Mode - OAuth Flow Details
              </span>
            </div>
            <div className="text-xs text-text-secondary font-mono space-y-1">
              <p>Current Status: {currentStatus}</p>
              <p>Progress: {progress}%</p>
              <p>Retry Count: {retryCount}</p>
              <p>Time Elapsed: {timeElapsed}s</p>
              <p>Processing: {isProcessing ? 'true' : 'false'}</p>
              {error && <p className="text-error">Error: {error.message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationProcessing;