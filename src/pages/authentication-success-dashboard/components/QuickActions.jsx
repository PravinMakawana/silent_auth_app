import React from 'react';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'transfer',
      title: 'Transfer Money',
      description: 'Send money to other accounts',
      icon: 'Send',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'balance',
      title: 'Check Balance',
      description: 'View account balances',
      icon: 'Wallet',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'history',
      title: 'Transaction History',
      description: 'View recent transactions',
      icon: 'History',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'bills',
      title: 'Pay Bills',
      description: 'Pay utilities and services',
      icon: 'Receipt',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'cards',
      title: 'Manage Cards',
      description: 'Control your debit/credit cards',
      icon: 'CreditCard',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      id: 'support',
      title: 'Customer Support',
      description: 'Get help and assistance',
      icon: 'HelpCircle',
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600'
    }
  ];

  const handleActionClick = (actionId) => {
    console.log(`Quick action clicked: ${actionId}`);
    // Mock action - in real app would navigate or open modal
  };

  return (
    <div className="auth-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} color="#1E3A8A" strokeWidth={2} />
        <h3 className="text-xl font-semibold text-text-primary font-heading">
          Quick Actions
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className="group p-4 bg-background hover:bg-border/50 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 text-center"
          >
            <div className={`w-12 h-12 ${action.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-150`}>
              <Icon name={action.icon} size={20} color={action.textColor.replace('text-', '#')} strokeWidth={2} />
            </div>
            <h4 className="text-sm font-medium text-text-primary font-caption mb-1">
              {action.title}
            </h4>
            <p className="text-xs text-text-secondary font-caption leading-tight">
              {action.description}
            </p>
          </button>
        ))}
      </div>

      {/* Popular Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-secondary font-caption mb-3">
          Most Used Today
        </h4>
        <div className="flex flex-wrap gap-2">
          {quickActions.slice(0, 3).map((action) => (
            <button
              key={`popular-${action.id}`}
              onClick={() => handleActionClick(action.id)}
              className="inline-flex items-center space-x-2 px-3 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-md text-sm font-medium font-caption transition-colors duration-150"
            >
              <Icon name={action.icon} size={14} color="#1E3A8A" strokeWidth={2} />
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;