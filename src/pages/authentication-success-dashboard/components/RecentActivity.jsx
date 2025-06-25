import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'transfer_out',
      title: 'Money Transfer',
      description: 'To Sarah Ahmad - CIMB Bank',
      amount: -500.00,
      currency: 'RM',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'completed',
      icon: 'Send',
      category: 'transfer'
    },
    {
      id: 2,
      type: 'bill_payment',
      title: 'Utility Bill Payment',
      description: 'TNB Electricity Bill - March 2024',
      amount: -185.50,
      currency: 'RM',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'completed',
      icon: 'Zap',
      category: 'bills'
    },
    {
      id: 3,
      type: 'deposit',
      title: 'Salary Deposit',
      description: 'Monthly Salary - ABC Company Sdn Bhd',
      amount: 4500.00,
      currency: 'RM',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'completed',
      icon: 'TrendingUp',
      category: 'income'
    },
    {
      id: 4,
      type: 'card_payment',
      title: 'Card Payment',
      description: 'Online Purchase - Shopee Malaysia',
      amount: -89.90,
      currency: 'RM',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'completed',
      icon: 'CreditCard',
      category: 'shopping'
    },
    {
      id: 5,
      type: 'transfer_in',
      title: 'Money Received',
      description: 'From Ahmad Rahman - Public Bank',
      amount: 200.00,
      currency: 'RM',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      status: 'completed',
      icon: 'ArrowDownLeft',
      category: 'transfer'
    },
    {
      id: 6,
      type: 'investment',
      title: 'Investment Purchase',
      description: 'Unit Trust - ASB Fund',
      amount: -1000.00,
      currency: 'RM',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'processing',
      icon: 'TrendingUp',
      category: 'investment'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Transactions', icon: 'List' },
    { id: 'transfer', label: 'Transfers', icon: 'Send' },
    { id: 'bills', label: 'Bills', icon: 'Receipt' },
    { id: 'income', label: 'Income', icon: 'TrendingUp' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' }
  ];

  const formatCurrency = (amount, currency) => {
    const formatted = new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: currency === 'RM' ? 'MYR' : currency,
      minimumFractionDigits: 2
    }).format(Math.abs(amount)).replace('MYR', 'RM');
    
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-background';
    }
  };

  const getAmountColor = (amount) => {
    return amount >= 0 ? 'text-success' : 'text-text-primary';
  };

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedFilter);

  return (
    <div className="auth-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} color="#1E3A8A" strokeWidth={2} />
          <h3 className="text-xl font-semibold text-text-primary font-heading">
            Recent Activity
          </h3>
        </div>
        <button className="text-sm text-primary font-medium font-caption hover:text-primary/80 transition-colors duration-150">
          View All
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium font-caption whitespace-nowrap transition-colors duration-150
              ${selectedFilter === filter.id
                ? 'bg-primary text-white' :'bg-background text-text-secondary hover:bg-border/50'
              }
            `}
          >
            <Icon name={filter.icon} size={14} color={selectedFilter === filter.id ? 'white' : '#6B7280'} strokeWidth={2} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-4 bg-background hover:bg-border/30 rounded-md transition-colors duration-150 cursor-pointer">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={activity.icon} size={18} color="#1E3A8A" strokeWidth={2} />
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-text-primary font-caption truncate">
                  {activity.title}
                </h4>
                <span className={`px-2 py-0.5 rounded text-xs font-medium font-caption ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <p className="text-xs text-text-secondary font-caption truncate">
                {activity.description}
              </p>
              <p className="text-xs text-text-secondary font-caption mt-1">
                {formatDate(activity.date)}
              </p>
            </div>

            {/* Amount */}
            <div className="flex-shrink-0 text-right">
              <p className={`text-sm font-semibold font-heading ${getAmountColor(activity.amount)}`}>
                {formatCurrency(activity.amount, activity.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-border/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Inbox" size={24} color="#6B7280" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-medium text-text-primary font-caption mb-1">
            No transactions found
          </h4>
          <p className="text-xs text-text-secondary font-caption">
            No transactions match the selected filter.
          </p>
        </div>
      )}

      {/* Activity Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs font-medium text-text-secondary font-caption mb-1">This Month</p>
            <p className="text-sm font-semibold text-text-primary font-heading">24 transactions</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary font-caption mb-1">Total Spent</p>
            <p className="text-sm font-semibold text-error font-heading">-RM 2,275.40</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary font-caption mb-1">Total Received</p>
            <p className="text-sm font-semibold text-success font-heading">+RM 4,700.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;