import React from 'react';
import Icon from 'components/AppIcon';

const SessionInfoPanel = ({ authToken, sessionId, currentLanguage, sessionTimer, formatSessionDuration }) => {
  const getSessionLabels = () => {
    if (currentLanguage === 'EN') {
      return {
        title: 'Session Information',
        sessionId: 'Session ID',
        authMethod: 'Authentication Method',
        securityLevel: 'Security Level',
        tokenStatus: 'Token Status',
        expiresIn: 'Expires In',
        connectionType: 'Connection Type'
      };
    } else {
      return {
        title: 'Maklumat Sesi',
        sessionId: 'ID Sesi',
        authMethod: 'Kaedah Pengesahan',
        securityLevel: 'Tahap Keselamatan',
        tokenStatus: 'Status Token',
        expiresIn: 'Tamat Dalam',
        connectionType: 'Jenis Sambungan'
      };
    }
  };

  const labels = getSessionLabels();

  // Mock session data
  const sessionData = {
    authMethod: currentLanguage === 'EN' ? 'OAuth 2.0 + PKCE' : 'OAuth 2.0 + PKCE',
    securityLevel: currentLanguage === 'EN' ? 'High Security' : 'Keselamatan Tinggi',
    tokenStatus: currentLanguage === 'EN' ? 'Active & Valid' : 'Aktif & Sah',
    expiresIn: currentLanguage === 'EN' ? '14 minutes 23 seconds' : '14 minit 23 saat',
    connectionType: currentLanguage === 'EN' ? 'TLS 1.3 Encrypted' : 'TLS 1.3 Disulitkan'
  };

  const getSessionInfoItems = () => [
    {
      icon: 'Hash',
      label: labels.sessionId,
      value: sessionId || 'SES_' + Date.now().toString().slice(-8),
      type: 'code'
    },
    {
      icon: 'Key',
      label: labels.authMethod,
      value: sessionData.authMethod,
      type: 'text',
      status: 'success'
    },
    {
      icon: 'Shield',
      label: labels.securityLevel,
      value: sessionData.securityLevel,
      type: 'text',
      status: 'success'
    },
    {
      icon: 'CheckCircle',
      label: labels.tokenStatus,
      value: sessionData.tokenStatus,
      type: 'text',
      status: 'success'
    },
    {
      icon: 'Clock',
      label: labels.expiresIn,
      value: sessionData.expiresIn,
      type: 'text',
      status: 'warning'
    },
    {
      icon: 'Wifi',
      label: labels.connectionType,
      value: sessionData.connectionType,
      type: 'text',
      status: 'success'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={12} color="#10B981" strokeWidth={2} />;
      case 'warning':
        return <Icon name="AlertTriangle" size={12} color="#F59E0B" strokeWidth={2} />;
      case 'error':
        return <Icon name="XCircle" size={12} color="#DC2626" strokeWidth={2} />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Info" size={20} color="#1E3A8A" strokeWidth={2} />
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {labels.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getSessionInfoItems().map((item, index) => (
          <div key={index} className="p-4 bg-background border border-border rounded-md">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name={item.icon} size={16} color="#1E3A8A" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-secondary font-caption mb-1">
                  {item.label}
                </p>
                <div className="flex items-center space-x-2">
                  <p className={`text-sm font-medium font-caption ${item.type === 'code' ? 'font-mono' : ''} ${getStatusColor(item.status)}`}>
                    {item.value}
                  </p>
                  {item.status && getStatusIcon(item.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Token Preview */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-md">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Key" size={16} color="#1E3A8A" strokeWidth={2} />
          <span className="text-sm font-medium text-primary font-caption">
            {currentLanguage === 'EN' ? 'Access Token (Preview)' : 'Token Akses (Pratonton)'}
          </span>
        </div>
        <div className="bg-surface border border-border rounded p-3">
          <p className="text-xs font-mono text-text-secondary break-all">
            {authToken ? `${authToken.substring(0, 32)}...` : 'mock_access_token_1234567890abcdef...'}
          </p>
        </div>
        <p className="text-xs text-text-secondary font-caption mt-2">
          {currentLanguage === 'EN' ?'Token is securely stored and will be used for API authentication' :'Token disimpan dengan selamat dan akan digunakan untuk pengesahan API'
          }
        </p>
      </div>

      {/* Session Activity */}
      <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} color="#10B981" strokeWidth={2} />
            <span className="text-sm font-medium text-success font-caption">
              {currentLanguage === 'EN' ? 'Session Activity' : 'Aktiviti Sesi'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary font-caption">
              {currentLanguage === 'EN' ? 'Active' : 'Aktif'}
            </span>
          </div>
        </div>
        <div className="mt-2 text-xs text-text-secondary font-caption">
          {currentLanguage === 'EN' 
            ? `Session established at ${new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })} (GMT+8)`
            : `Sesi diwujudkan pada ${new Date().toLocaleTimeString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' })} (GMT+8)`
          }
        </div>
      </div>
    </div>
  );
};

export default SessionInfoPanel;