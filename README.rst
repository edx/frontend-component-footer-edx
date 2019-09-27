frontend-component-footer-edx
=========================

|Build Status| |Coveralls| |npm_version| |npm_downloads| |license|
|semantic-release|

frontend-component-footer-edx is a library containing a site footer
component for use when building edX frontend applications.

Usage
-----

To install frontend-component-footer-edx into your project::

   npm i --save @edx/frontend-component-footer-edx

Component Usage::

   import Footer from '@edx/frontend-component-footer-edx';
   import footerMessages from '@edx/frontend-component-footer-edx/src/i18n/index';

   ...

   <Footer
      handleAllTrackEvents={(eventName, properties) => {/* track click event */}}
      onLanguageSelected={(languageCode) => {/* set language */}}
      supportedLanguages={[
         { label: 'English', value: 'en'},
         { label: 'Español', value: 'es' },
      ]}
   />

- handleAllTrackEvents (required)
- onLanguageSelected (optional)
- supportedLanguages (optional)

Requirements
------------

This component uses ``@edx/frontend-i18n``. Any containing app must provide ``@edx/frontend-i18n`` as a peer dependency, and be wrapped inside an ``IntlProvider`` element, whether or not your consuming application is actually localized. For a basic default locale (English) version, follow the ``IntlProvider`` example in the sample application in `src/index.jsx <src/index.jsx>`__.

Development
-----------

Start the dev server::

   npm i && npm start

Build the component::

   npm run build

.. |Build Status| image:: https://api.travis-ci.org/edx/frontend-component-footer-edx.svg?branch=master
   :target: https://travis-ci.org/edx/frontend-component-footer-edx
.. |Coveralls| image:: https://img.shields.io/coveralls/edx/frontend-component-footer-edx.svg?branch=master
   :target: https://coveralls.io/github/edx/frontend-component-footer-edx
.. |npm_version| image:: https://img.shields.io/npm/v/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |npm_downloads| image:: https://img.shields.io/npm/dt/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |semantic-release| image:: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
   :target: https://github.com/semantic-release/semantic-release
