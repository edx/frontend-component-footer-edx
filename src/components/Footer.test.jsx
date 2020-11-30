import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { AppContext } from '@edx/frontend-platform/react';

import Footer, { EVENT_NAMES } from './Footer';

jest.mock('@edx/frontend-platform/analytics');
jest.mock('@edx/frontend-platform');

describe('<Footer />', () => {
  describe('renders correctly', () => {
    it('renders without a language selector', () => {
      const tree = renderer
        .create((
          <IntlProvider locale="en">
            <AppContext.Provider
              value={{
                authenticatedUser: null,
                config: {
                  LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
                },
              }}
            >
              <Footer />
            </AppContext.Provider>
          </IntlProvider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders without a language selector in es', () => {
      const tree = renderer
        .create((
          <IntlProvider locale="es">
            <AppContext.Provider
              value={{
                authenticatedUser: null,
                config: {
                  LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
                },
              }}
            >
              <Footer />
            </AppContext.Provider>
          </IntlProvider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('when hidden', () => {
      it('should hide itself', () => {
        const tree = renderer
          .create((
            <IntlProvider locale="en">
              <AppContext.Provider
                value={{
                  authenticatedUser: null,
                  config: {
                    LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
                    HIDE_FOOTER: true,
                  },
                }}
              >
                <Footer />
              </AppContext.Provider>
            </IntlProvider>
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('renders with a language selector', () => {
      const tree = renderer
        .create((
          <IntlProvider locale="en">
            <AppContext.Provider
              value={{
                authenticatedUser: null,
                config: {
                  LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
                },
              }}
            >
              <Footer
                onLanguageSelected={() => {}}
                supportedLanguages={[
                  { label: 'English', value: 'en' },
                  { label: 'Español', value: 'es' },
                ]}
              />
            </AppContext.Provider>
          </IntlProvider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('handles analytics', () => {
    it('calls sendTrackEvent prop when external links clicked', () => {
      const wrapper = mount((
        <IntlProvider locale="en">
          <AppContext.Provider
            value={{
              authenticatedUser: null,
              config: {
                LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
              },
            }}
          >
            <Footer />
          </AppContext.Provider>
        </IntlProvider>
      ));
      const externalLinks = wrapper.find("a[target='_blank']");

      expect(externalLinks.length).not.toEqual(0);

      externalLinks.forEach((externalLink) => {
        const callIndex = sendTrackEvent.mock.calls.length;
        externalLink.simulate('click');
        expect(sendTrackEvent.mock.calls[callIndex]).toEqual([
          EVENT_NAMES.FOOTER_LINK,
          {
            category: 'outbound_link',
            label: externalLink.prop('href'),
          },
        ]);
      });
    });
  });

  describe('handles language switching', () => {
    it('calls onLanguageSelected prop when a language is changed', () => {
      const mockHandleLanguageSelected = jest.fn();
      const wrapper = mount((
        <IntlProvider locale="en">
          <AppContext.Provider
            value={{
              authenticatedUser: null,
              config: {
                LOGO_TRADEMARK_URL: process.env.LOGO_TRADEMARK_URL,
              },
            }}
          >
            <Footer
              onLanguageSelected={mockHandleLanguageSelected}
              supportedLanguages={[
                { label: 'English', value: 'en' },
                { label: 'Español', value: 'es' },
              ]}
            />
          </AppContext.Provider>
        </IntlProvider>
      ));

      wrapper.find('form').simulate('submit', {
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
