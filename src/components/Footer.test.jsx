/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { AppContext } from '@edx/frontend-platform/react';

import Footer, { EVENT_NAMES } from './Footer';

jest.mock('@edx/frontend-platform/analytics');
jest.mock('@edx/frontend-platform');

const FooterWithoutLanguageSelector = ({ locale = 'en', config }) => {
  const contextValue = useMemo(() => ({
    authenticatedUser: null,
    config,
  }), [config]);

  return (
    <IntlProvider locale={locale}>
      <AppContext.Provider
        value={contextValue}
      >
        <Footer />
      </AppContext.Provider>
    </IntlProvider>
  );
};

const FooterWithLanguageSelector = ({ onLanguageSelected = () => {} }) => {
  const contextValue = useMemo(() => ({
    authenticatedUser: null,
    config: {
      LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
    },
  }), []);

  return (
    <IntlProvider locale="en">
      <AppContext.Provider
        value={contextValue}
      >
        <Footer
          onLanguageSelected={onLanguageSelected}
          supportedLanguages={[
            { label: 'English', value: 'en' },
            { label: 'Español', value: 'es' },
          ]}
        />
      </AppContext.Provider>
    </IntlProvider>
  );
};

describe('<Footer />', () => {
  describe('renders correctly', () => {
    it('renders without a language selector', () => {
      const config = { LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL };
      const tree = renderer
        .create(<FooterWithoutLanguageSelector config={config} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders without a language selector in es', () => {
      const config = { LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL };
      const tree = renderer
        .create(<FooterWithoutLanguageSelector locale="es" config={config} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('when hidden', () => {
      it('should hide itself', () => {
        const config = {
          LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
          HIDE_FOOTER: true,
        };
        const tree = renderer
          .create(<FooterWithoutLanguageSelector config={config} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('renders with a language selector', () => {
      const tree = renderer
        .create(<FooterWithLanguageSelector />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('handles analytics', () => {
    it('calls sendTrackEvent prop when external links clicked', () => {
      const config = {
        LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
      };
      const wrapper = render(<FooterWithoutLanguageSelector config={config} />);
      const externalLinks = wrapper.container.querySelectorAll("a[target='_blank']");

      expect(externalLinks.length).not.toEqual(0);

      externalLinks.forEach((externalLink) => {
        const callIndex = sendTrackEvent.mock.calls.length;
        fireEvent.click(externalLink);
        expect(sendTrackEvent.mock.calls[callIndex]).toEqual([
          EVENT_NAMES.FOOTER_LINK,
          {
            category: 'outbound_link',
            label: externalLink.href,
          },
        ]);
      });
    });
  });

  describe('handles language switching', () => {
    it('calls onLanguageSelected prop when a language is changed', () => {
      const mockHandleLanguageSelected = jest.fn();
      render(<FooterWithLanguageSelector onLanguageSelected={mockHandleLanguageSelected} />);

      fireEvent.submit(screen.getByTestId('site-footer-submit-btn'), {
        target: {
          elements: {
            'site-footer-language-select': {
              value: 'es',
            },
          },
        },
      });

      expect(mockHandleLanguageSelected).toHaveBeenCalledWith('es');
    });
  });
});
