import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import {
  ModalDialog, Form, useToggle, ActionRow, Button,
} from '@edx/paragon';
import Cookies from 'js-cookie';

const CCPA_COOKIE_NAME = 'edx_do_not_sell';
const isBrowser = typeof window !== 'undefined';
const isGpcEnabled = isBrowser ? navigator.globalPrivacyControl : false;

const CCPADialog = ({ dialogIsOpen, closeCallback, baseURL }) => {
  const [isOpen, open, close] = useToggle(dialogIsOpen);

  const getDoNotSellCookie = () => Cookies.get(CCPA_COOKIE_NAME) === 'true';
  const [personalizationChecked, setPersonalizationChecked] = useState(() => !getDoNotSellCookie());

  const setDoNotSellCookie = (value) => {
    const { host } = new URL(baseURL);
    // Use global domain (`.edx.org`) without the subdomain
    const hostParts = host.split('.');
    const domain = hostParts.length > 2
      ? `.${hostParts.slice(-2).join('.')}`
      : host;
    const cookieOptions = host.startsWith('localhost')
      ? {}
      : { domain, expires: 365 };
    if (!value) {
      // If cookie is not set to true, then default to sharing the data
      Cookies.remove(CCPA_COOKIE_NAME, cookieOptions);
      return;
    }
    Cookies.set(CCPA_COOKIE_NAME, value, cookieOptions);
  };

  const handleSwitchChange = (e) => {
    setPersonalizationChecked(e.target.checked);
  };

  const handleConfirmation = () => {
    if (typeof window === 'object' && getDoNotSellCookie() === personalizationChecked) {
      setDoNotSellCookie(!personalizationChecked);
      window.location.reload();
    }
    close();
  };

  useEffect(() => {
    if (dialogIsOpen) {
      setDoNotSellCookie(isGpcEnabled);
      setPersonalizationChecked(!getDoNotSellCookie());
      open();
    }
  }, [dialogIsOpen, open]);

  useEffect(() => {
    if (!isOpen) {
      closeCallback();
    }
  }, [closeCallback, isOpen]);

  return (
    <ModalDialog
      title="Manage Consent Preferences"
      isOpen={isOpen}
      onClose={close}
      size="xl"
      variant="default"
      hasCloseButton
      className="ccpa-dialog"
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          <FormattedMessage
            id="prospectus.data.sharing.modal.title"
            description="CCPA Data sharing dialog title"
            defaultMessage="Manage Consent Preferences"
          />
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form.Group>
          <Form.Switch
            className="h4"
            checked={personalizationChecked}
            onChange={handleSwitchChange}
            disabled={isGpcEnabled}
            floatLabelLeft
          >
            <FormattedMessage
              id="prospectus.data.sharing.modal.toggle.title"
              description="CCPA Data sharing dialog toggle title"
              defaultMessage="Share My Information with Third Parties for Personalized Advertising"
            />
          </Form.Switch>
        </Form.Group>
        <div>
          <FormattedMessage
            id="prospectus.data.sharing.modal.description"
            description="CCPA Data sharing dialog description"
            defaultMessage="We share information with business partners to provide personalized
              online advertising. Under the California Consumer Privacy Act
              (“CCPA”), some of this data sharing may be broadly considered a “sale”
              of information. Except for this type of sharing, we do not sell your
              information. You may opt out of these “sales” under the CCPA. Your
              selection is saved to this browser, on this device. If you clear your
              browser cookies, you will need to opt out of “sales” again. To learn
              more about 2U's use of your data, please see our"
          />{' '}
          <a href={`${baseURL}/edx-privacy-policy`}>
            <FormattedMessage
              id="prospectus.data.sharing.modal.privacy-policy.link.title"
              description="CCPA Data sharing dialog toggle title"
              defaultMessage="Privacy Policy."
            />
          </a>
        </div>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary">
            <FormattedMessage
              id="prospectus.data.sharing.modal.cancel.title"
              description="CCPA Data sharing dialog cancel button title"
              defaultMessage="Cancel"
            />
          </ModalDialog.CloseButton>
          <Button variant="primary" onClick={handleConfirmation}>
            <FormattedMessage
              id="prospectus.data.sharing.modal.confirm.title"
              description="CCPA Data sharing dialog confirmation button title"
              defaultMessage="Confirm"
            />
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

CCPADialog.propTypes = {
  dialogIsOpen: PropTypes.bool,
  closeCallback: PropTypes.func,
  baseURL: PropTypes.string,
};

CCPADialog.defaultProps = {
  dialogIsOpen: false,
  closeCallback: () => {},
  baseURL: 'https://edx.org',
};

export default CCPADialog;
