import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { mount } from 'enzyme';

import CCPADialog from './CCPADialog';

describe('CCPADialog', () => {
  describe('Functionality', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Toggle off data sharing sets the cookie', () => {
      const cookieSetSpy = jest.spyOn(window.document, 'cookie', 'set');
      const reloadMock = jest.fn();
      delete window.location;
      window.location = { reload: reloadMock };
      const wrapper = mount(
        <IntlProvider locale="en">
          <CCPADialog dialogIsOpen baseURL="http://localhost" />
        </IntlProvider>,
      );
      const toggleInput = wrapper.find('.pgn__form-switch-input');
      toggleInput.simulate('change', { target: { checked: false } });

      const confirmButton = wrapper.findWhere(
        (node) => node.type() === 'button' && node.text().includes('Confirm'),
      );
      confirmButton.simulate('click');
      expect(wrapper.html()).toEqual('');
      expect(cookieSetSpy).toHaveBeenCalledWith('edx_do_not_sell=true; path=/');
      expect(reloadMock).toBeCalled();
    });

    it('Toggle on data sharing removes the cookie', () => {
      document.cookie = 'edx_do_not_sell=true; path=/';
      const cookieSetSpy = jest.spyOn(window.document, 'cookie', 'set');
      const reloadMock = jest.fn();
      delete window.location;
      window.location = { reload: reloadMock };
      const wrapper = mount(
        <IntlProvider locale="en">
          <CCPADialog dialogIsOpen />
        </IntlProvider>,
      );
      const toggleInput = wrapper.find('.pgn__form-switch-input');
      toggleInput.simulate('change', { target: { checked: true } });

      const confirmButton = wrapper.findWhere(
        (node) => node.type() === 'button' && node.text().includes('Confirm'),
      );
      confirmButton.simulate('click');
      expect(wrapper.html()).toEqual('');
      expect(cookieSetSpy).toBeCalled();
      expect(reloadMock).toBeCalled();
    });

    it('Cancel button closes the dialog', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <CCPADialog dialogIsOpen />
        </IntlProvider>,
      );
      const cancelButton = wrapper.findWhere(
        (node) => node.type() === 'button' && node.text().includes('Cancel'),
      );
      cancelButton.simulate('click');
      expect(wrapper.html()).toEqual('');
    });

    it('Close button closes the dialog', async () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <CCPADialog dialogIsOpen />
        </IntlProvider>,
      );
      wrapper.update();
      const closeButton = wrapper.find('[aria-label="Close"]');
      closeButton.simulate('click');
      expect(wrapper.html()).toEqual('');
    });
  });

  describe('Snapshots', () => {
    it('Dialog is open', () => {
      function createNodeMock(element) {
        if (element.type === 'div') {
          return document.createElement('div');
        }
        return null;
      }
      const oldPortal = ReactDOM.createPortal;
      ReactDOM.createPortal = (node) => node;
      const tree = renderer
        .create(
          ReactDOM.createPortal(
            <IntlProvider locale="en">
              <CCPADialog dialogIsOpen />
            </IntlProvider>,
          ),
          { createNodeMock },
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = oldPortal;
    });
    it('Dialog is closed', () => {
      const tree = renderer
        .create(<CCPADialog dialogIsOpen={false} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
