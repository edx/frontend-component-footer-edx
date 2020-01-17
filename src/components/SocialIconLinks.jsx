import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faRedditSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import messages from './Footer.messages';

const SocialIconLinks = ({ intl, ...props }) => {
  const iconLinks = [
    {
      title: 'Facebook',
      url: 'http://www.facebook.com/EdxOnline',
      icon: <FontAwesomeIcon icon={faFacebookSquare} className="social-icon" size="2x" />,
      screenReaderText: intl.formatMessage(messages['footer.socialLinks.srText.facebook']),
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/edXOnline',
      icon: <FontAwesomeIcon icon={faTwitterSquare} className="social-icon" size="2x" />,
      screenReaderText: intl.formatMessage(messages['footer.socialLinks.srText.twitter']),
    },
    {
      title: 'LinkedIn',
      url: 'http://www.linkedin.com/company/edx',
      icon: <FontAwesomeIcon icon={faLinkedin} className="social-icon" size="2x" />,
      screenReaderText: intl.formatMessage(messages['footer.socialLinks.srText.linkedin']),
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/edxonline/',
      icon: <FontAwesomeIcon icon={faInstagram} className="social-icon" size="2x" />,
      screenReaderText: intl.formatMessage(messages['footer.socialLinks.srText.instagram']),
    },
    {
      title: 'Reddit',
      url: 'http://www.reddit.com/r/edx',
      icon: <FontAwesomeIcon icon={faRedditSquare} className="social-icon" size="2x" />,
      screenReaderText: intl.formatMessage(messages['footer.socialLinks.srText.reddit']),
    },
  ].map(link => (
    <li key={link.url}>
      <a
        href={link.url}
        title={link.title}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {link.icon}
        <span className="sr-only">{link.screenReaderText}</span>
      </a>
    </li>
  ));

  return <React.Fragment>{iconLinks}</React.Fragment>;
};

SocialIconLinks.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SocialIconLinks);
