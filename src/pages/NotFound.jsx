import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/o-auth-authentication-initiation');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <div className="auth-card p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={32} color="#DC2626" strokeWidth={2} />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-semibold text-text-primary font-heading mb-2">
            Page Not Found
          </h1>
          <p className="text-text-secondary font-caption mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoHome}
            className="auth-button-primary w-full h-12 flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={18} color="white" strokeWidth={2} />
            <span>Return to Authentication</span>
          </button>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-success/5 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="#10B981" strokeWidth={2} />
              <span className="text-sm font-medium text-success font-caption">
                Secure Banking Environment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;