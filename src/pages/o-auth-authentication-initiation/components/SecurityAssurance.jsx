import React from 'react';
import Icon from 'components/AppIcon';

const SecurityAssurance = ({ currentLanguage }) => {
  const content = {
    EN: {
      title: 'Your Security is Our Priority',
      features: [
        {
          icon: 'Shield',
          title: 'End-to-End Encryption',
          description: 'All data transmitted is protected with military-grade encryption protocols'
        },
        {
          icon: 'Eye',
          title: 'Privacy Protection',
          description: 'Your personal information is never stored or shared with third parties'
        },
        {
          icon: 'Clock',
          title: 'Session Management',
          description: 'Automatic session timeout ensures your account remains secure'
        },
        {
          icon: 'AlertTriangle',
          title: 'Fraud Detection',
          description: 'Advanced monitoring systems detect and prevent unauthorized access'
        }
      ],
      complianceTitle: 'Regulatory Compliance',
      complianceItems: [
        'Bank Negara Malaysia (BNM) Guidelines',
        'Payment Card Industry (PCI DSS)',
        'ISO 27001 Information Security',
        'Malaysian Personal Data Protection Act'
      ]
    },
    MY: {
      title: 'Keselamatan Anda Adalah Keutamaan Kami',
      features: [
        {
          icon: 'Shield',
          title: 'Penyulitan Hujung ke Hujung',
          description: 'Semua data yang dihantar dilindungi dengan protokol penyulitan gred tentera'
        },
        {
          icon: 'Eye',
          title: 'Perlindungan Privasi',
          description: 'Maklumat peribadi anda tidak pernah disimpan atau dikongsi dengan pihak ketiga'
        },
        {
          icon: 'Clock',
          title: 'Pengurusan Sesi',
          description: 'Tamat masa sesi automatik memastikan akaun anda kekal selamat'
        },
        {
          icon: 'AlertTriangle',
          title: 'Pengesanan Penipuan',
          description: 'Sistem pemantauan termaju mengesan dan mencegah akses tanpa kebenaran'
        }
      ],
      complianceTitle: 'Pematuhan Peraturan',
      complianceItems: [
        'Garis Panduan Bank Negara Malaysia (BNM)',
        'Industri Kad Pembayaran (PCI DSS)',
        'Keselamatan Maklumat ISO 27001',
        'Akta Perlindungan Data Peribadi Malaysia'
      ]
    }
  };

  const text = content[currentLanguage];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="auth-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} color="#1E3A8A" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {text.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {text.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-background rounded-md">
              <div className="flex-shrink-0 mt-1">
                <Icon name={feature.icon} size={16} color="#10B981" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary font-caption mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-text-secondary font-caption leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Information */}
      <div className="auth-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Award" size={20} color="#1E3A8A" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {text.complianceTitle}
          </h3>
        </div>

        <div className="space-y-2">
          {text.complianceItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} color="#10B981" strokeWidth={2} />
              <span className="text-sm text-text-primary font-caption">{item}</span>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Phone" size={12} color="#6B7280" strokeWidth={2} />
            <span className="font-caption">
              {currentLanguage === 'EN' ? 'Support: 1-300-88-5465' : 'Sokongan: 1-300-88-5465'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAssurance;