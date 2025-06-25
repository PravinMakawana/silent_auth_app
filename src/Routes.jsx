import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import AuthenticationStateManager from 'components/ui/AuthenticationStateManager';
import OAuthAuthenticationInitiation from "pages/o-auth-authentication-initiation";
import AuthenticationProcessing from "pages/authentication-processing";
import AuthenticationSuccessDashboard from "pages/authentication-success-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthenticationStateManager>
          <Header />
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<OAuthAuthenticationInitiation />} />
            <Route path="/o-auth-authentication-initiation" element={<OAuthAuthenticationInitiation />} />
            <Route path="/authentication-processing" element={<AuthenticationProcessing />} />
            <Route path="/authentication-success-dashboard" element={<AuthenticationSuccessDashboard />} />
          </RouterRoutes>
        </AuthenticationStateManager>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;