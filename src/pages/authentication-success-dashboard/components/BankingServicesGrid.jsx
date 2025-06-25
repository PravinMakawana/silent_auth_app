import React from 'react';
import Icon from 'components/AppIcon';

const BankingServicesGrid = ({ currentLanguage, onContinueToBanking }) => {
  const getServiceLabels = () => {
    if (currentLanguage === 'EN') {
      return {
        title: 'Quick Access Banking Services',
        subtitle: 'Access your most used banking features',
        continueButton: 'Continue to Full Banking Dashboard',
        services: {
          balance: {
            title: 'Account Balance',
            description: 'View current balance and recent transactions',
            amount: 'RM 12,450.75'
          },
          transfer: {
            title: 'Transfer Funds',
            description: 'Send money to other accounts instantly',
            status: 'Available'
          },
          payments: {
            title: 'Bill Payments',
            description: 'Pay utilities, credit cards, and more',
            pending: '3 pending'
          },
          history: {
            title: 'Transaction History',
            description: 'View detailed transaction records',
            recent: 'Last 30 days'
          },
          cards: {
            title: 'Manage Cards',
            description: 'Control your debit and credit cards',
            active: '2 active cards'
          },
          support: {
            title: 'Customer Support',
            description: '24/7 assistance and help center',
            status: 'Online now'
          }
        }
      };
    } else {
      return {
        title: 'Perkhidmatan Perbankan Akses Pantas',
        subtitle: 'Akses ciri perbankan yang paling kerap digunakan',
        continueButton: 'Teruskan ke Papan Pemuka Perbankan Penuh',
        services: {
          balance: {
            title: 'Baki Akaun',
            description: 'Lihat baki semasa dan transaksi terkini',
            amount: 'RM 12,450.75'
          },
          transfer: {
            title: 'Pindah Dana',
            description: 'Hantar wang ke akaun lain dengan segera',
            status: 'Tersedia'
          },
          payments: {
            title: 'Bayaran Bil',
            description: 'Bayar utiliti, kad kredit, dan lain-lain',
            pending: '3 menunggu'
          },
          history: {
            title: 'Sejarah Transaksi',
            description: 'Lihat rekod transaksi terperinci',
            recent: '30 hari lepas'
          },
          cards: {
            title: 'Urus Kad',
            description: 'Kawal kad debit dan kredit anda',
            active: '2 kad aktif'
          },
          support: {
            title: 'Sokongan Pelanggan',
            description: 'Bantuan 24/7 dan pusat bantuan',
            status: 'Dalam talian sekarang'
          }
        }
      };
    }
  };

  const labels = getServiceLabels();

  const getQuickAccessServices = () => [
    {
      id: 'balance',
      icon: 'Wallet',
      color: '#10B981',
      bgColor: 'bg-success/10',
      data: labels.services.balance,
      priority: 'high'
    },
    {
      id: 'transfer',
      icon: 'ArrowRightLeft',
      color: '#1E3A8A',
      bgColor: 'bg-primary/10',
      data: labels.services.transfer,
      priority: 'high'
    },
    {
      id: 'payments',
      icon: 'CreditCard',
      color: '#F59E0B',
      bgColor: 'bg-warning/10',
      data: labels.services.payments,
      priority: 'medium'
    },
    {
      id: 'history',
      icon: 'History',
      color: '#6B7280',
      bgColor: 'bg-secondary/10',
      data: labels.services.history,
      priority: 'medium'
    },
    {
      id: 'cards',
      icon: 'Smartphone',
      color: '#8B5CF6',
      bgColor: 'bg-purple-500/10',
      data: labels.services.cards,
      priority: 'low'
    },
    {
      id: 'support',
      icon: 'MessageCircle',
      color: '#059669',
      bgColor: 'bg-emerald-500/10',
      data: labels.services.support,
      priority: 'low'
    }
  ];

  const handleServiceClick = (serviceId) => {
    const serviceNames = {
      balance: currentLanguage === 'EN' ? 'Account Balance' : 'Baki Akaun',
      transfer: currentLanguage === 'EN' ? 'Transfer Funds' : 'Pindah Dana',
      payments: currentLanguage === 'EN' ? 'Bill Payments' : 'Bayaran Bil',
      history: currentLanguage === 'EN' ? 'Transaction History' : 'Sejarah Transaksi',
      cards: currentLanguage === 'EN' ? 'Manage Cards' : 'Urus Kad',
      support: currentLanguage === 'EN' ? 'Customer Support' : 'Sokongan Pelanggan'
    };

    alert(
      currentLanguage === 'EN' 
        ? `Opening ${serviceNames[serviceId]} service...`
        : `Membuka perkhidmatan ${serviceNames[serviceId]}...`
    );
  };

  const services = getQuickAccessServices();

  return (
    <div className="auth-card p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
          {labels.title}
        </h2>
        <p className="text-text-secondary font-caption">
          {labels.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
            className="p-4 bg-surface border border-border rounded-lg hover:shadow-card hover:border-primary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                <Icon name={service.icon} size={24} color={service.color} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-text-primary font-caption mb-1 group-hover:text-primary transition-colors duration-200">
                  {service.data.title}
                </h3>
                <p className="text-xs text-text-secondary font-caption mb-2 line-clamp-2">
                  {service.data.description}
                </p>
                <div className="flex items-center justify-between">
                  {service.data.amount && (
                    <span className="text-sm font-bold text-success font-caption">
                      {service.data.amount}
                    </span>
                  )}
                  {service.data.status && (
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded font-caption">
                      {service.data.status}
                    </span>
                  )}
                  {service.data.pending && (
                    <span className="text-xs px-2 py-1 bg-warning/10 text-warning rounded font-caption">
                      {service.data.pending}
                    </span>
                  )}
                  {service.data.recent && (
                    <span className="text-xs text-text-secondary font-caption">
                      {service.data.recent}
                    </span>
                  )}
                  {service.data.active && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-caption">
                      {service.data.active}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <Icon name="ChevronRight" size={16} color="#6B7280" strokeWidth={2} className="group-hover:text-primary transition-colors duration-200" />
            </div>
          </button>
        ))}
      </div>

      {/* Continue to Full Dashboard */}
      <div className="text-center">
        <button
          onClick={onContinueToBanking}
          className="auth-button-primary px-8 py-4 text-base font-semibold rounded-lg shadow-card hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-primary/20"
        >
          <div className="flex items-center space-x-2">
            <Icon name="ArrowRight" size={20} color="white" strokeWidth={2} />
            <span>{labels.continueButton}</span>
          </div>
        </button>
        
        <p className="text-xs text-text-secondary font-caption mt-3">
          {currentLanguage === 'EN' ?'Access all banking features and advanced tools' :'Akses semua ciri perbankan dan alat lanjutan'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-background rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary font-heading">
            RM 12.4K
          </div>
          <div className="text-xs text-text-secondary font-caption">
            {currentLanguage === 'EN' ? 'Balance' : 'Baki'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary font-heading">
            23
          </div>
          <div className="text-xs text-text-secondary font-caption">
            {currentLanguage === 'EN' ? 'Transactions' : 'Transaksi'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary font-heading">
            2
          </div>
          <div className="text-xs text-text-secondary font-caption">
            {currentLanguage === 'EN' ? 'Active Cards' : 'Kad Aktif'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary font-heading">
            100%
          </div>
          <div className="text-xs text-text-secondary font-caption">
            {currentLanguage === 'EN' ? 'Secure' : 'Selamat'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingServicesGrid;