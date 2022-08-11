import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LanguageSelector({
  intl, options, onSubmit, ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const languageCode = e.target.elements['site-footer-language-select'].value;
    onSubmit(languageCode);
  };

  return (
    <form
      className="d-flex align-items-center"
      onSubmit={handleSubmit}
      {...props}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="site-footer-language-select" className="m-0">
        <FontAwesomeIcon icon={faLanguage} size="2x" className="text-primary" />
        <div className="sr-only">
          <FormattedMessage
            id="footer.languageForm.select.label"
            defaultMessage="Choose Language"
            description="The label for the language select part of the language selection form."
          />
        </div>
      </label>
      <select
        id="site-footer-language-select"
        className="mx-2"
        name="site-footer-language-select"
        defaultValue={intl.locale}
      >
        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
      <button className="btn btn-outline-primary btn-sm" type="submit">
        <FormattedMessage
          id="footer.languageForm.submit.label"
          defaultMessage="Apply"
          description="Label for button to submit the language selection form."
        />
      </button>
    </form>
  );
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default injectIntl(LanguageSelector);
