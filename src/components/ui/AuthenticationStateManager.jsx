import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthStateContext = createContext();

const initialState = {
  currentStage: 'initiation',
  isAuthenticated: false,
  isProcessing: false,
  authToken: null,
  sessionId: null,
  securityLevel: 'standard',
  error: null,
  pkceCodeVerifier: null,
  pkceCodeChallenge: null,
  state: null,
  timeoutId: null,
  sessionStartTime: null,
  lastActivity: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INITIATE_AUTH':
      return {
        ...state,
        currentStage: 'initiation',
        isProcessing: false,
        error: null,
        pkceCodeVerifier: action.payload.codeVerifier,
        pkceCodeChallenge: action.payload.codeChallenge,
        state: action.payload.state,
        sessionStartTime: Date.now(),
        lastActivity: Date.now()
      };

    case 'START_PROCESSING':
      return {
        ...state,
        currentStage: 'processing',
        isProcessing: true,
        error: null,
        lastActivity: Date.now()
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        currentStage: 'success',
        isAuthenticated: true,
        isProcessing: false,
        authToken: action.payload.token,
        sessionId: action.payload.sessionId,
        securityLevel: action.payload.securityLevel || 'standard',
        error: null,
        lastActivity: Date.now()
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        isProcessing: false,
        error: action.payload.error,
        lastActivity: Date.now()
      };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        lastActivity: Date.now()
      };

    case 'SET_TIMEOUT':
      return {
        ...state,
        timeoutId: action.payload.timeoutId
      };

    case 'CLEAR_TIMEOUT':
      return {
        ...state,
        timeoutId: null
      };

    case 'SESSION_TIMEOUT':
      return {
        ...initialState,
        error: { type: 'session_timeout', message: 'Session expired for security' }
      };

    case 'RESET_AUTH':
      return initialState;

    default:
      return state;
  }
};

export const AuthenticationStateManager = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // Generate PKCE parameters
  const generatePKCE = () => {
    const codeVerifier = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
      .replace(/[+/=]/g, (m) => ({ '+': '-', '/': '_', '=': '' }[m]));
    
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier))
      .then(hash => {
        const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
          .replace(/[+/=]/g, (m) => ({ '+': '-', '/': '_', '=': '' }[m]));
        return { codeVerifier, codeChallenge };
      });
  };

  // Generate secure state parameter
  const generateState = () => {
    return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))))
      .replace(/[+/=]/g, (m) => ({ '+': '-', '/': '_', '=': '' }[m]));
  };

  // Session timeout management
  useEffect(() => {
    const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
    
    if (state.sessionStartTime && !state.isAuthenticated) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'SESSION_TIMEOUT' });
        navigate('/o-auth-authentication-initiation');
      }, SESSION_TIMEOUT);

      dispatch({ type: 'SET_TIMEOUT', payload: { timeoutId } });

      return () => {
        clearTimeout(timeoutId);
        dispatch({ type: 'CLEAR_TIMEOUT' });
      };
    }
  }, [state.sessionStartTime, state.isAuthenticated, navigate]);

  // Route synchronization
  useEffect(() => {
    const routeStageMap = {
      '/o-auth-authentication-initiation': 'initiation',
      '/authentication-processing': 'processing',
      '/authentication-success-dashboard': 'success'
    };

    const expectedStage = routeStageMap[location.pathname];
    if (expectedStage && expectedStage !== state.currentStage) {
      // Prevent unauthorized access to later stages
      if (expectedStage === 'processing' && state.currentStage !== 'initiation') {
        navigate('/o-auth-authentication-initiation');
      } else if (expectedStage === 'success' && !state.isAuthenticated) {
        navigate('/o-auth-authentication-initiation');
      }
    }
  }, [location.pathname, state.currentStage, state.isAuthenticated, navigate]);

  // Authentication flow methods
  const initiateAuthentication = async () => {
    try {
      const pkce = await generatePKCE();
      const state = generateState();
      
      dispatch({
        type: 'INITIATE_AUTH',
        payload: {
          codeVerifier: pkce.codeVerifier,
          codeChallenge: pkce.codeChallenge,
          state
        }
      });

      // Simulate OAuth provider redirect preparation
      setTimeout(() => {
        navigate('/authentication-processing');
        dispatch({ type: 'START_PROCESSING' });
      }, 1000);

    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: { error: { type: 'init_error', message: 'Failed to initialize authentication' } }
      });
    }
  };

  const processAuthentication = async (authCode, receivedState) => {
    try {
      // Validate state parameter
      if (receivedState !== state.state) {
        throw new Error('Invalid state parameter');
      }

      // Simulate token exchange
      const response = await simulateTokenExchange(authCode, state.pkceCodeVerifier);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: response.accessToken,
          sessionId: response.sessionId,
          securityLevel: response.securityLevel
        }
      });

      navigate('/authentication-success-dashboard');

    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: { error: { type: 'auth_error', message: error.message } }
      });
    }
  };

  const simulateTokenExchange = async (authCode, codeVerifier) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful response
    return {
      accessToken: 'mock_access_token_' + Date.now(),
      sessionId: 'session_' + Date.now(),
      securityLevel: 'high',
      expiresIn: 3600
    };
  };

  const updateActivity = () => {
    dispatch({ type: 'UPDATE_ACTIVITY' });
  };

  const resetAuthentication = () => {
    dispatch({ type: 'RESET_AUTH' });
    navigate('/o-auth-authentication-initiation');
  };

  const contextValue = {
    ...state,
    initiateAuthentication,
    processAuthentication,
    updateActivity,
    resetAuthentication
  };

  return (
    <AuthStateContext.Provider value={contextValue}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within AuthenticationStateManager');
  }
  return context;
};

export default AuthenticationStateManager;