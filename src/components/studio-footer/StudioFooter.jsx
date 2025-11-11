import React, { useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import {
  Container,
  Hyperlink,
  Image,
  MailtoLink,
} from '@openedx/paragon';
import './StudioFooter.css';
import messages from './messages';

ensureConfig([
  'LMS_BASE_URL',
  'MARKETING_SITE_BASE_URL',
  'TERMS_OF_SERVICE_URL',
  'PRIVACY_POLICY_URL',
  'SUPPORT_EMAIL',
  'SITE_NAME',
  'STUDIO_BASE_URL',
  'LOGO_URL',
  'ENABLE_RELEASE_NOTES',
], 'Studio Footer component');

const StudioFooter = () => {
  const intl = useIntl();
  const { config } = useContext(AppContext);

  return (
    <footer
      role="contentinfo"
      aria-label={intl.formatMessage(messages.footerLabel)}
    >
      <div
        style={{
          height: '1px',
          flexShrink: 0,
          alignSelf: 'stretch',
          background: 'var(--Light-500, #E1DDD2)',
        }}
      />
      <div>
        <Container size="xl" className="p-4">
          <div className="footer-links-row text-muted">
            <Hyperlink className="footer-link footer-link-color" destination={`${config.BASE_URL}/home`}>{intl.formatMessage(messages.studioLinkLabel)}</Hyperlink>
            <Hyperlink data-testid="LMS" className="footer-link footer-link-color" destination={config.LMS_BASE_URL}>{intl.formatMessage(messages.lmsLinkLabel)}</Hyperlink>
            {config.ENABLE_RELEASE_NOTES === 'true' && <Hyperlink className="footer-link footer-link-color" destination={`${config.BASE_URL}/release-notes`}>{intl.formatMessage(messages.releaseNotesLinkLabel)}</Hyperlink>}
            <Hyperlink className="footer-link footer-link-color" destination="https://docs.edx.org/">{intl.formatMessage(messages.edxDocumentationLinkLabel)}</Hyperlink>
            <MailtoLink className="footer-link footer-link-color" to={config.SUPPORT_EMAIL}>{intl.formatMessage(messages.contactUsLinkLabel)}</MailtoLink>
          </div>
        </Container>
        <div
          style={{
            height: '1px',
            flexShrink: 0,
            alignSelf: 'stretch',
            background: 'var(--Light-300, #EDEBE4)',
          }}
        />
        <Container size="xl" className="p-4">
          <div className="footer-bottom-row">
            <div className="footer-bottom-columns">
              <div className="footer-bottom-col text-muted">
                <div className="footer-links-row">
                  <span className="footer-link footer-muted-text-color">© {new Date().getFullYear()} <Hyperlink className="footer-link footer-link-color" destination={config.MARKETING_SITE_BASE_URL}>{config.SITE_NAME}</Hyperlink>.</span>
                  <Hyperlink data-testid="termsOfService" className="footer-link footer-link-color" destination={config.TERMS_OF_SERVICE_URL}>{intl.formatMessage(messages.termsOfServiceLinkLabel)}</Hyperlink>
                  <Hyperlink className="footer-link footer-link-color" destination={config.PRIVACY_POLICY_URL}>{intl.formatMessage(messages.privacyPolicyLinkLabel)}</Hyperlink>
                  <Hyperlink className="footer-link footer-link-color" destination={`${config.STUDIO_BASE_URL}/accessibility`}>
                    {intl.formatMessage(messages.accessibilityRequestLinkLabel)}
                  </Hyperlink>
                </div>
                <div>
                  {/*
                    Site operators: Please do not remove this paragraph! this attributes back to edX and
                      makes your acknowledgement of edX's trademarks clear.
                    Translators: 'edX' and 'Open edX' are trademarks of 'edX Inc.'. Please do not translate
                      any of these trademarks and company names.
                  */}
                  <span className="footer-link footer-muted-text-color">{intl.formatMessage(messages.trademarkMessage)}<Hyperlink className="footer-link footer-link-color" destination="https://www.edx.org">edX Inc</Hyperlink>.</span>
                </div>
              </div>
            </div>
            <div className="">
              <Hyperlink destination={config.MARKETING_SITE_BASE_URL}>
                <Image
                  src={config.LOGO_URL}
                  alt="edX logo"
                  height={32}
                  className="footer-logo"
                />
              </Hyperlink>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default StudioFooter;
