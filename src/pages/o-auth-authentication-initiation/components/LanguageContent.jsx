import React from 'react';
import Icon from 'components/AppIcon';

const LanguageContent = ({ currentLanguage }) => {
  const content = {
    EN: {
      welcomeTitle: 'Welcome to Secure Banking',
      welcomeSubtitle: 'Your trusted financial partner in Malaysia',
      processTitle: 'Silent Authentication Process',
      processDescription: 'Our advanced OAuth 2.0 system provides seamless access to your banking services without compromising security. The silent authentication flow ensures you can access your account quickly while maintaining the highest security standards.',
      processSteps: [
        {
          step: '1',
          title: 'Secure Connection',
          description: 'Establishing encrypted connection with banking servers'
        },
        {
          step: '2',
          title: 'Identity Verification',
          description: 'Validating your credentials through secure protocols'
        },
        {
          step: '3',
          title: 'Access Granted',
          description: 'Seamless access to your banking dashboard'
        }
      ],
      benefitsTitle: 'Why Choose Silent Authentication?',
      benefits: [
        {
          icon: 'Zap',
          title: 'Lightning Fast',
          description: 'Access your account in seconds without repeated logins'
        },
        {
          icon: 'Shield',
          title: 'Bank-Grade Security',
          description: 'Military-level encryption protects your sensitive data'
        },
        {
          icon: 'Smartphone',
          title: 'Mobile Optimized',
          description: 'Seamless experience across all your devices'
        }
      ]
    },
    MY: {
      welcomeTitle: 'Selamat Datang ke Perbankan Selamat',
      welcomeSubtitle: 'Rakan kewangan terpercaya anda di Malaysia',
      processTitle: 'Proses Pengesahan Senyap',
      processDescription: 'Sistem OAuth 2.0 termaju kami menyediakan akses lancar ke perkhidmatan perbankan anda tanpa menjejaskan keselamatan. Aliran pengesahan senyap memastikan anda boleh mengakses akaun anda dengan cepat sambil mengekalkan standard keselamatan tertinggi.',
      processSteps: [
        {
          step: '1',
          title: 'Sambungan Selamat',
          description: 'Mewujudkan sambungan tersulitkan dengan pelayan perbankan'
        },
        {
          step: '2',
          title: 'Pengesahan Identiti',
          description: 'Mengesahkan kelayakan anda melalui protokol selamat'
        },
        {
          step: '3',
          title: 'Akses Diberikan',
          description: 'Akses lancar ke papan pemuka perbankan anda'
        }
      ],
      benefitsTitle: 'Mengapa Pilih Pengesahan Senyap?',
      benefits: [
        {
          icon: 'Zap',
          title: 'Sepantas Kilat',
          description: 'Akses akaun anda dalam beberapa saat tanpa log masuk berulang'
        },
        {
          icon: 'Shield',
          title: 'Keselamatan Gred Bank',
          description: 'Penyulitan tahap tentera melindungi data sensitif anda'
        },
        {
          icon: 'Smartphone',
          title: 'Dioptimumkan Mudah Alih',
          description: 'Pengalaman lancar merentas semua peranti anda'
        }
      ]
    }
  };

  const text = content[currentLanguage];

  return (
    <div className="space-y-8 mb-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary font-heading mb-2">
          {text.welcomeTitle}
        </h1>
        <p className="text-lg text-text-secondary font-caption">
          {text.welcomeSubtitle}
        </p>
      </div>

      {/* Process Overview */}
      <div className="auth-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={20} color="#1E3A8A" strokeWidth={2} />
          <h2 className="text-xl font-semibold text-text-primary font-heading">
            {text.processTitle}
          </h2>
        </div>
        
        <p className="text-text-secondary font-caption mb-6 leading-relaxed">
          {text.processDescription}
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {text.processSteps.map((step, index) => (
            <div key={index} className="text-center p-4 bg-background rounded-md">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-semibold font-caption">
                {step.step}
              </div>
              <h3 className="text-sm font-medium text-text-primary font-caption mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-text-secondary font-caption leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="auth-card p-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading mb-4">
          {text.benefitsTitle}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {text.benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-background rounded-md">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                <Icon name={benefit.icon} size={20} color="#10B981" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-medium text-text-primary font-caption mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-text-secondary font-caption leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageContent;