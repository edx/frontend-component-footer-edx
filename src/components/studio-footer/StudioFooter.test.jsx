/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import StudioFooter from './StudioFooter';

const config = {
  LMS_BASE_URL: process.env.LMS_BASE_URL,
  MARKETING_SITE_BASE_URL: process.env.MARKETING_SITE_BASE_URL,
  TERMS_OF_SERVICE_URL: process.env.TERMS_OF_SERVICE_URL,
  PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  SITE_NAME: process.env.SITE_NAME,
  STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
  SHOW_ACCESSIBILITY_PAGE: process.env.SHOW_ACCESSIBILITY_PAGE,
};

let currentConfig;
const Component = () => {
  const contextValue = useMemo(() => ({
    authenticatedUser: null,
    config: currentConfig,
  }), []);

  return (
    <IntlProvider locale="en">
      <AppContext.Provider value={contextValue}>
        <StudioFooter />
      </AppContext.Provider>
    </IntlProvider>
  );
};

describe('Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentConfig = config;
  });
  describe('should show all links', () => {
    it('should only show all link', () => {
      render(<Component />);
      expect(screen.getByText('LMS')).toBeVisible();
      expect(screen.queryByTestId('termsOfService')).toBeVisible();
    });
  });
});
