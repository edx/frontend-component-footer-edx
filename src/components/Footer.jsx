import React from 'react';
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import {
  APP_CONFIG_INITIALIZED,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import LinkList from './LinkList';
import AppleAppStoreButton from './AppleAppStoreButton';
import GooglePlayStoreButton from './GooglePlayStoreButton';
import SocialIconLinks from './SocialIconLinks';
import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
import Cookies from 'js-cookie';

ensureConfig([
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

const MARKETING_BASE_URL = 'https://edx.org';

const CCPA_COOKIE_NAME = 'edx_do_not_sell';

// Some MFEs (such as frontend-app-payment) don't want a footer to be shown.
// This lets them hide it.
subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    HIDE_FOOTER: !!process.env.HIDE_FOOTER,
  }, 'Footer additional config');
});

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);

    this.state = {
      // Used for constructing the enterprise market link.
      utmSource: 'edx.org',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      // Wait until component mount to get the hostname to preserve
      // gatsby compatibility.
      utmSource: global.location.hostname,
    });
  }

  getLocalePrefix(locale) {
    const twoLetterPrefix = locale.substring(0, 2).toLowerCase();
    if (twoLetterPrefix === 'en') {
      return '';
    }
    return `/${twoLetterPrefix}`;
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }
  
  setDoNotSellCookie (value) {
    const { host } = new URL(`${MARKETING_BASE_URL}`);
    // Use global domain (`.edx.org`) without the subdomain
    const hostParts = host.split('.');
    const domain = hostParts.length > 2
      ? `.${hostParts.slice(-2).join('.')}`
      : host;
    const cookieOptions = host.startsWith('localhost')
      ? {}
      : { domain, expires: 365 };
    Cookies.set(CCPA_COOKIE_NAME, value, cookieOptions);
  };

   toggleConsentModal () {
    window.OneTrust?.ToggleInfoDisplay();
  };

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const localePrefix = this.getLocalePrefix(intl.locale);

    const { config } = this.context;

    if (config.HIDE_FOOTER) {
      return null;
    }

    return (
      <footer
        role="contentinfo"
        aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
        className="footer d-flex justify-content-center border-top py-3 px-4"
      >
        <div className="container-fluid d-grid">
          <div className="area-1">
            <a
              href="https://edx.org"
              aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
            >
              <img
                src={logo || config.LOGO_TRADEMARK_URL}
                alt={intl.formatMessage(messages['footer.logo.altText'])}
                style={{ maxHeight: 45 }}
              />
            </a>
            {showLanguageSelector && (
              <div className="i18n d-flex mt-4">
                <LanguageSelector options={supportedLanguages} onSubmit={onLanguageSelected} />
              </div>
            )}
          </div>
          <LinkList
            className="area-2"
            title="edX"
            links={[
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/about-us`,
                title: intl.formatMessage(messages['footer.edxLinks.about']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/affiliate-program`,
                title: intl.formatMessage(messages['footer.edxLinks.affiliates']),
                hidden: intl.locale === 'es',
              },
              {
                href: `https://business.edx.org/?utm_campaign=edX.org+Referral&utm_medium=Footer&utm_source=${this.state.utmSource}`,
                title: intl.formatMessage(messages['footer.edxLinks.business']),
              },
              {
                href: 'http://open.edx.org',
                title: intl.formatMessage(messages['footer.edxLinks.openEdx']),
                hidden: intl.locale === 'es',
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/careers`,
                title: intl.formatMessage(messages['footer.edxLinks.careers']),
                hidden: intl.locale === 'es',
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/news-announcements`,
                title: intl.formatMessage(messages['footer.edxLinks.news']),
              },
            ]}
          />
          <LinkList
            className="area-3"
            title={intl.formatMessage(messages['footer.legalLinks.heading'])}
            links={[
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/edx-terms-service`,
                title: intl.formatMessage(messages['footer.legalLinks.termsOfService']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/edx-privacy-policy`,
                title: intl.formatMessage(messages['footer.legalLinks.privacyPolicy']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/accessibility`,
                title: intl.formatMessage(messages['footer.legalLinks.a11yPolicy']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/trademarks`,
                title: intl.formatMessage(messages['footer.legalLinks.trademarkPolicy']),
                hidden: intl.locale === 'es',
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/sitemap`,
                title: intl.formatMessage(messages['footer.legalLinks.sitemap']),
                hidden: intl.locale === 'es',
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/edx-privacy-policy/cookies`,
                title: intl.formatMessage(messages['footer.legalLinks.cookiePolicy']),
              },
              {
                title: intl.formatMessage(messages['footer.legalLinks.doNotSellData']),
                className: 'px-0 text-left text-decoration-none',
                onClick: () => {this.setDoNotSellCookie(true), this.toggleConsentModal()},
                variant: 'link',
                size: 'inline',
                id: 'footer-dns-link',
              },
            ]}
          />
          <LinkList
            className="area-4"
            title={intl.formatMessage(messages['footer.connectLinks.heading'])}
            links={[
              {
                href: 'https://blog.edx.org',
                title: intl.formatMessage(messages['footer.connectLinks.blog']),
              },
              {
                href: 'https://courses.edx.org/support/contact_us',
                title: intl.formatMessage(messages['footer.connectLinks.contact']),
              },
              {
                href: 'https://support.edx.org',
                title: intl.formatMessage(messages['footer.connectLinks.help']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/policy/security`,
                title: intl.formatMessage(messages['footer.connectLinks.security']),
              },
              {
                href: `${MARKETING_BASE_URL}${localePrefix}/media-kit`,
                title: intl.formatMessage(messages['footer.connectLinks.mediaKit']),
                hidden: intl.locale === 'es',
              },
            ]}
          />
          <div className="area-5">
            <ul className="d-flex flex-row justify-content-between list-unstyled max-width-222 p-0 mb-4">
              <SocialIconLinks onClick={this.externalLinkClickHandler} />
            </ul>
            <ul className="d-flex flex-row justify-content-between list-unstyled max-width-264 p-0 mb-5">
              <li>
                <GooglePlayStoreButton onClick={this.externalLinkClickHandler} />
              </li>
              <li>
                <AppleAppStoreButton onClick={this.externalLinkClickHandler} />
              </li>
            </ul>
            <p>
              © {new Date().getFullYear()} edX LLC. All rights reserved.
              <br />
              <FormattedMessage
                id="footer.trademarks"
                defaultMessage="{icpMessage}"
                description="A description of the trademarks that belong to edX."
                values={{
                  icpMessage: (
                    <>
                      深圳市恒宇博科技有限公司 <a style={{ textDecoration: 'underline' }} href="https://beian.miit.gov.cn">粤ICP备17044299号-2</a>
                    </>
                  ),
                }}
              />
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.contextType = AppContext;

Footer.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

Footer.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(Footer);
export { EVENT_NAMES };
