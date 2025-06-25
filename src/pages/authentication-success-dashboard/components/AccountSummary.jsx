import React from 'react';
import Icon from 'components/AppIcon';

const AccountSummary = () => {
  const accounts = [
    {
      id: 'savings',
      type: 'Savings Account',
      accountNumber: '1234567890',
      balance: 15750.50,
      currency: 'RM',
      icon: 'Piggy Bank',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'current',
      type: 'Current Account',
      accountNumber: '0987654321',
      balance: 8920.25,
      currency: 'RM',
      icon: 'Wallet',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'fixed',
      type: 'Fixed Deposit',
      accountNumber: '5678901234',
      balance: 50000.00,
      currency: 'RM',
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: currency === 'RM' ? 'MYR' : currency,
      minimumFractionDigits: 2
    }).format(amount).replace('MYR', 'RM');
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getAccountIcon = (iconName) => {
    const iconMap = {
      'Piggy Bank': 'PiggyBank',
      'Wallet': 'Wallet',
      'TrendingUp': 'TrendingUp'
    };
    return iconMap[iconName] || 'CreditCard';
  };

  return (
    <div className="auth-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} color="#1E3A8A" strokeWidth={2} />
          <h3 className="text-xl font-semibold text-text-primary font-heading">
            Account Summary
          </h3>
        </div>
        <button className="text-sm text-primary font-medium font-caption hover:text-primary/80 transition-colors duration-150">
          View All Accounts
        </button>
      </div>

      {/* Total Balance Card */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary font-caption mb-1">
              Total Balance
            </p>
            <p className="text-2xl font-bold text-primary font-heading">
              {formatCurrency(getTotalBalance(), 'RM')}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="DollarSign" size={24} color="#1E3A8A" strokeWidth={2} />
          </div>
        </div>
        <div className="flex items-center space-x-1 mt-2">
          <Icon name="TrendingUp" size={14} color="#10B981" strokeWidth={2} />
          <span className="text-xs text-success font-caption">+2.5% from last month</span>
        </div>
      </div>

      {/* Individual Accounts */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="p-4 bg-background hover:bg-border/30 rounded-md transition-colors duration-150 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${account.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon name={getAccountIcon(account.icon)} size={18} color={account.color.replace('text-', '#')} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary font-caption">
                    {account.type}
                  </h4>
                  <p className="text-xs text-text-secondary font-caption">
                    ****{account.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-text-primary font-heading">
                  {formatCurrency(account.balance, account.currency)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Eye" size={12} color="#6B7280" strokeWidth={2} />
                  <span className="text-xs text-text-secondary font-caption">Available</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Balance Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 p-3 bg-success/5 hover:bg-success/10 text-success rounded-md transition-colors duration-150">
            <Icon name="Download" size={16} color="#10B981" strokeWidth={2} />
            <span className="text-sm font-medium font-caption">Download Statement</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-primary/5 hover:bg-primary/10 text-primary rounded-md transition-colors duration-150">
            <Icon name="RefreshCw" size={16} color="#1E3A8A" strokeWidth={2} />
            <span className="text-sm font-medium font-caption">Refresh Balance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;