import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProcessStatusIndicator = () => {
  const location = useLocation();

  const getProcessSteps = () => [
    {
      id: 'initiation',
      path: '/o-auth-authentication-initiation',
      title: 'Authentication Setup',
      description: 'Secure connection initialization',
      icon: 'Shield'
    },
    {
      id: 'processing',
      path: '/authentication-processing',
      title: 'Verification',
      description: 'Processing credentials',
      icon: 'Loader'
    },
    {
      id: 'success',
      path: '/authentication-success-dashboard',
      title: 'Access Granted',
      description: 'Authentication complete',
      icon: 'CheckCircle'
    }
  ];

  const getCurrentStepIndex = () => {
    const steps = getProcessSteps();
    const currentPath = location?.pathname || '/';
    
    // Check for exact match first
    let index = steps?.findIndex(step => step?.path === currentPath) || -1;
    
    // If no exact match and we're on root path, default to first step
    if (index < 0 && currentPath === '/') {
      index = 0;
    }
    
    // If still no match, default to first step
    return index >= 0 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex();
  const steps = getProcessSteps() || [];
  const currentStep = steps?.[currentStepIndex] || steps?.[0] || {
    id: 'default',
    title: 'Authentication Process',
    description: 'Please wait while we process your request',
    icon: 'Shield'
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    // Ensure we have a valid step object with fallback
    const safeStep = step || { icon: 'Shield' };
    const iconName = safeStep?.icon || 'Shield';
    
    if (status === 'completed') {
      return <Icon name="CheckCircle" size={20} color="#10B981" strokeWidth={2} />;
    }
    if (status === 'current') {
      if (iconName === 'Loader') {
        return <Icon name="Loader" size={20} color="#1E3A8A" strokeWidth={2} className="animate-spin" />;
      }
      return <Icon name={iconName} size={20} color="#1E3A8A" strokeWidth={2} />;
    }
    return <Icon name={iconName} size={20} color="#6B7280" strokeWidth={2} />;
  };

  const getProgressPercentage = () => {
    const totalSteps = steps?.length || 1;
    return ((currentStepIndex + 1) / totalSteps) * 100;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Current Step Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          {getStepIcon(currentStep, 'current')}
        </div>
        <h2 className="text-xl font-semibold text-text-primary font-heading mb-1">
          {currentStep?.title || 'Authentication Process'}
        </h2>
        <p className="text-sm text-text-secondary font-caption">
          {currentStep?.description || 'Please wait while we process your request'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-text-secondary font-caption">
            Step {currentStepIndex + 1} of {steps?.length || 1}
          </span>
          <span className="text-xs font-medium text-text-secondary font-caption">
            {Math.round(getProgressPercentage())}% Complete
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Step Indicators - Desktop */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.max(0, (currentStepIndex / Math.max(1, (steps?.length || 1) - 1)) * 100)}%` }}
            />
          </div>

          {/* Step Circles */}
          {steps?.length > 0 && steps.filter(step => step != null).map((step, index) => {
            const status = getStepStatus(index);
            const safeStep = step || { id: `step-${index}`, title: 'Step', icon: 'Shield' };
            
            return (
              <div key={safeStep?.id || `step-${index}`} className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-150
                    ${status === 'completed' 
                      ? 'bg-success border-success' 
                      : status === 'current' ? 'bg-primary border-primary' : 'bg-surface border-border'
                    }
                  `}
                >
                  {getStepIcon(safeStep, status)}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium font-caption ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-text-secondary'
                  }`}>
                    {safeStep?.title || 'Step'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Indicators - Mobile */}
      <div className="sm:hidden">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {steps?.length > 0 && steps.filter(step => step != null).map((step, index) => {
            const status = getStepStatus(index);
            const safeStep = step || { id: `step-${index}`, title: 'Step', icon: 'Shield' };
            
            return (
              <div key={safeStep?.id || `step-${index}`} className="flex items-center space-x-2 flex-shrink-0">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-150
                    ${status === 'completed' 
                      ? 'bg-success border-success' 
                      : status === 'current' ? 'bg-primary border-primary' : 'bg-surface border-border'
                    }
                  `}
                >
                  {React.cloneElement(getStepIcon(safeStep, status), { size: 16 })}
                </div>
                <span className={`text-xs font-medium font-caption ${
                  status === 'current' ? 'text-primary' : 
                  status === 'completed' ? 'text-success' : 'text-text-secondary'
                }`}>
                  {safeStep?.title || 'Step'}
                </span>
                {index < (steps?.length || 1) - 1 && (
                  <Icon name="ChevronRight" size={14} color="#E5E7EB" strokeWidth={2} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Context */}
      <div className="mt-6 p-3 bg-success/5 border border-success/20 rounded-md">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="#10B981" strokeWidth={2} />
          <span className="text-sm font-medium text-success font-caption">
            Secure OAuth 2.0 Authentication Flow
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1 font-caption">
          Your connection is encrypted and monitored for security compliance
        </p>
      </div>
    </div>
  );
};

export default ProcessStatusIndicator;