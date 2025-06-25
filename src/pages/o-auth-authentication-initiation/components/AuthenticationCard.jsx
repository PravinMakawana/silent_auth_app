import React from 'react';
import Icon from 'components/AppIcon';

const AuthenticationCard = ({ 
  currentLanguage, 
  isLoading, 
  isProcessing, 
  connectionStatus, 
  onSecureLogin, 
  error 
}) => {
  const content = {
    EN: {
      title: 'Secure Banking Access',
      subtitle: 'SecureBank Malaysia',
      description: 'Access your banking services with our advanced OAuth 2.0 security protocol. Your connection is encrypted and monitored for maximum protection.',
      buttonText: 'Secure Login',
      buttonLoadingText: 'Connecting...',
      processingText: 'Processing Authentication...',
      errorTitle: 'Authentication Error',
      retryButton: 'Try Again',
      securityNote: 'This authentication uses bank-grade security standards',
      complianceText: 'Compliant with Bank Negara Malaysia regulations'
    },
    MY: {
      title: 'Akses Perbankan Selamat',
      subtitle: 'SecureBank Malaysia',
      description: 'Akses perkhidmatan perbankan anda dengan protokol keselamatan OAuth 2.0 termaju. Sambungan anda disulitkan dan dipantau untuk perlindungan maksimum.',
      buttonText: 'Log Masuk Selamat',
      buttonLoadingText: 'Menyambung...',
      processingText: 'Memproses Pengesahan...',
      errorTitle: 'Ralat Pengesahan',
      retryButton: 'Cuba Lagi',
      securityNote: 'Pengesahan ini menggunakan standard keselamatan gred bank',
      complianceText: 'Mematuhi peraturan Bank Negara Malaysia'
    }
  };

  const text = content[currentLanguage];
  const isDisabled = isLoading || isProcessing || connectionStatus !== 'secure';

  const getBankLogo = () => (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Shield" size={24} color="white" strokeWidth={2} />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold text-primary font-heading">
          {text.subtitle}
        </h1>
        <div className="flex items-center space-x-1 mt-1">
          <Icon name="MapPin" size={12} color="#6B7280" strokeWidth={2} />
          <span className="text-xs text-text-secondary font-caption">Malaysia</span>
        </div>
      </div>
    </div>
  );

  const getMainButton = () => {
    if (isProcessing) {
      return (
        <div className="w-full h-12 bg-primary/90 text-white rounded-md flex items-center justify-center space-x-2">
          <Icon name="Loader" size={18} color="white" strokeWidth={2} className="animate-spin" />
          <span className="font-medium font-caption">{text.processingText}</span>
        </div>
      );
    }

    return (
      <button
        onClick={onSecureLogin}
        disabled={isDisabled}
        className={`
          w-full h-12 rounded-md font-medium font-caption transition-all duration-150 flex items-center justify-center space-x-2
          ${isDisabled 
            ? 'bg-border text-text-secondary cursor-not-allowed' :'auth-button-primary hover:shadow-md active:scale-[0.98]'
          }
        `}
      >
        {isLoading ? (
          <>
            <Icon name="Loader" size={18} color="white" strokeWidth={2} className="animate-spin" />
            <span>{text.buttonLoadingText}</span>
          </>
        ) : (
          <>
            <Icon name="Shield" size={18} color="white" strokeWidth={2} />
            <span>{text.buttonText}</span>
          </>
        )}
      </button>
    );
  };

  const getErrorDisplay = () => {
    if (!error) return null;

    return (
      <div className="mb-4 p-3 bg-error/5 border border-error/20 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="AlertCircle" size={16} color="#DC2626" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-error font-caption mb-1">
              {text.errorTitle}
            </p>
            <p className="text-xs text-text-secondary font-caption">
              {error.message || 'Please try again or contact support if the issue persists.'}
            </p>
          </div>
        </div>
        <button
          onClick={onSecureLogin}
          className="mt-3 px-3 py-1 bg-error text-white text-xs rounded font-medium font-caption hover:bg-error/90 transition-colors duration-150"
        >
          {text.retryButton}
        </button>
      </div>
    );
  };

  return (
    <div className="auth-card p-6 sm:p-8 mb-6">
      {/* Bank Logo & Title */}
      {getBankLogo()}

      {/* Main Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary font-heading mb-2">
          {text.title}
        </h2>
        <p className="text-text-secondary font-caption leading-relaxed">
          {text.description}
        </p>
      </div>

      {/* Error Display */}
      {getErrorDisplay()}

      {/* Main Action Button */}
      <div className="mb-6">
        {getMainButton()}
      </div>

      {/* Security Features */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-background rounded-md">
          <Icon name="Lock" size={16} color="#10B981" strokeWidth={2} />
          <span className="text-sm text-text-primary font-caption">256-bit SSL Encryption</span>
          <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} className="ml-auto" />
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-background rounded-md">
          <Icon name="Eye" size={16} color="#10B981" strokeWidth={2} />
          <span className="text-sm text-text-primary font-caption">OAuth 2.0 Protocol</span>
          <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} className="ml-auto" />
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-background rounded-md">
          <Icon name="Award" size={16} color="#10B981" strokeWidth={2} />
          <span className="text-sm text-text-primary font-caption">Bank Grade Security</span>
          <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} className="ml-auto" />
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center space-y-2">
        <p className="text-xs text-text-secondary font-caption">
          {text.securityNote}
        </p>
        <div className="flex items-center justify-center space-x-1">
          <Icon name="Award" size={12} color="#6B7280" strokeWidth={2} />
          <span className="text-xs text-text-secondary font-caption">
            {text.complianceText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;