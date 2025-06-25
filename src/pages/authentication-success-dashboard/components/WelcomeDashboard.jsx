import React from 'react';
import Icon from 'components/AppIcon';

const WelcomeDashboard = ({ userData, currentTime, sessionDuration }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-MY', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="auth-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-heading mb-1">
            {getGreeting()}, {userData.name.split(' ')[0]}!
          </h2>
          <p className="text-text-secondary font-caption">
            {formatDate(currentTime)} • {formatTime(currentTime)}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-success font-caption">
            Online Banking Active
          </span>
        </div>
      </div>

      {/* User Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-background rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="User" size={16} color="#6B7280" strokeWidth={2} />
            <span className="text-xs font-medium text-text-secondary font-caption">Account Holder</span>
          </div>
          <p className="text-sm font-semibold text-text-primary font-caption">{userData.name}</p>
        </div>

        <div className="p-4 bg-background rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CreditCard" size={16} color="#6B7280" strokeWidth={2} />
            <span className="text-xs font-medium text-text-secondary font-caption">Account Number</span>
          </div>
          <p className="text-sm font-semibold text-text-primary font-caption">
            ****{userData.accountNumber.slice(-4)}
          </p>
        </div>

        <div className="p-4 bg-background rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} color="#6B7280" strokeWidth={2} />
            <span className="text-xs font-medium text-text-secondary font-caption">Last Login</span>
          </div>
          <p className="text-sm font-semibold text-text-primary font-caption">{userData.lastLogin}</p>
        </div>

        <div className="p-4 bg-background rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Globe" size={16} color="#6B7280" strokeWidth={2} />
            <span className="text-xs font-medium text-text-secondary font-caption">Language</span>
          </div>
          <p className="text-sm font-semibold text-text-primary font-caption">{userData.preferredLanguage}</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="#1E3A8A" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-primary font-caption mb-1">
              Welcome to Your Secure Banking Dashboard
            </h3>
            <p className="text-xs text-text-secondary font-caption leading-relaxed">
              Your authentication was successful and your session is now active. 
              You can now access all your banking services securely. 
              Your session will automatically timeout after 15 minutes of inactivity for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;