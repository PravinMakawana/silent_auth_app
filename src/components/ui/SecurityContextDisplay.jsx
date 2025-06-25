import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SecurityContextDisplay = () => {
  const [connectionStatus, setConnectionStatus] = useState('secure');
  const [encryptionLevel, setEncryptionLevel] = useState('256-bit');
  const [sessionInfo, setSessionInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Simulate connection monitoring
    const interval = setInterval(() => {
      setConnectionStatus('secure');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update session info based on current route
    if (location.pathname === '/authentication-success-dashboard') {
      setSessionInfo({
        sessionId: 'SES_' + Date.now().toString().slice(-8),
        establishedAt: new Date().toLocaleTimeString(),
        securityLevel: 'High',
        complianceStatus: 'Verified'
      });
    } else {
      setSessionInfo(null);
    }
  }, [location.pathname]);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'secure':
        return <Icon name="Shield" size={16} color="#10B981" strokeWidth={2} />;
      case 'connecting':
        return <Icon name="Loader" size={16} color="#F59E0B" strokeWidth={2} className="animate-spin" />;
      case 'error':
        return <Icon name="AlertTriangle" size={16} color="#DC2626" strokeWidth={2} />;
      default:
        return <Icon name="Shield" size={16} color="#6B7280" strokeWidth={2} />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'secure':
        return 'Secure Connection Active';
      case 'connecting':
        return 'Establishing Secure Connection';
      case 'error':
        return 'Connection Security Warning';
      default:
        return 'Connection Status Unknown';
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'secure':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getSecurityBadges = () => [
    {
      icon: 'Lock',
      label: `${encryptionLevel} SSL`,
      description: 'End-to-end encryption',
      status: 'active'
    },
    {
      icon: 'Shield',
      label: 'OAuth 2.0',
      description: 'Secure authentication protocol',
      status: 'active'
    },
    {
      icon: 'Eye',
      label: 'Privacy Protected',
      description: 'Data handling compliance',
      status: 'active'
    },
    {
      icon: 'CheckCircle',
      label: 'Bank Grade Security',
      description: 'Financial industry standards',
      status: 'active'
    }
  ];

  const getComplianceIndicators = () => [
    {
      standard: 'PCI DSS',
      status: 'compliant',
      description: 'Payment card industry compliance'
    },
    {
      standard: 'ISO 27001',
      status: 'compliant',
      description: 'Information security management'
    },
    {
      standard: 'SOC 2',
      status: 'compliant',
      description: 'Service organization controls'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Connection Status Header */}
      <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-md">
        <div className="flex items-center space-x-2">
          {getConnectionIcon()}
          <span className={`text-sm font-medium font-caption ${getConnectionStatusColor()}`}>
            {getConnectionStatusText()}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary font-caption">Live</span>
        </div>
      </div>

      {/* Security Badges - Desktop */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {getSecurityBadges().map((badge, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-md">
            <div className="flex-shrink-0">
              <Icon name={badge.icon} size={18} color="#10B981" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary font-caption">
                {badge.label}
              </p>
              <p className="text-xs text-text-secondary font-caption truncate">
                {badge.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>

      {/* Security Badges - Mobile */}
      <div className="md:hidden space-y-2">
        {getSecurityBadges().slice(0, 2).map((badge, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-md">
            <Icon name={badge.icon} size={16} color="#10B981" strokeWidth={2} />
            <div className="flex-1">
              <span className="text-sm font-medium text-text-primary font-caption">
                {badge.label}
              </span>
            </div>
            <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} />
          </div>
        ))}
      </div>

      {/* Session Information */}
      {sessionInfo && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="User" size={16} color="#1E3A8A" strokeWidth={2} />
            <span className="text-sm font-semibold text-primary font-caption">
              Active Session
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-text-secondary font-caption">Session ID:</span>
              <p className="font-mono text-text-primary mt-1">{sessionInfo.sessionId}</p>
            </div>
            <div>
              <span className="text-text-secondary font-caption">Established:</span>
              <p className="text-text-primary font-caption mt-1">{sessionInfo.establishedAt}</p>
            </div>
            <div>
              <span className="text-text-secondary font-caption">Security Level:</span>
              <p className="text-success font-medium font-caption mt-1">{sessionInfo.securityLevel}</p>
            </div>
            <div>
              <span className="text-text-secondary font-caption">Compliance:</span>
              <p className="text-success font-medium font-caption mt-1">{sessionInfo.complianceStatus}</p>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Indicators */}
      <div className="p-3 bg-background border border-border rounded-md">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Award" size={16} color="#6B7280" strokeWidth={2} />
          <span className="text-sm font-medium text-text-primary font-caption">
            Compliance Standards
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {getComplianceIndicators().map((indicator, index) => (
            <div
              key={index}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded text-xs font-medium font-caption"
              title={indicator.description}
            >
              <Icon name="CheckCircle" size={12} color="#10B981" strokeWidth={2} />
              <span>{indicator.standard}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-3 bg-warning/5 border border-warning/20 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="#F59E0B" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning font-caption mb-1">
              Security Notice
            </p>
            <p className="text-xs text-text-secondary font-caption">
              This authentication session is monitored for security compliance. 
              Your data is protected according to Malaysian banking regulations and international standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityContextDisplay;