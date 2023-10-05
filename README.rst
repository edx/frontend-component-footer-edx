#############################
frontend-component-footer-edx
#############################

|Build Status| |npm_version| |npm_downloads| |license|
|semantic-release|

********
Purpose
********

frontend-component-footer-edx is a library containing a site footer
component for use when building edX frontend applications.

Prerequisites
=============

The `devstack`_ is currently recommended as a development environment for your
new MFE.  If you start it with ``make dev.up.lms`` that should give you
everything you need as a companion to this frontend.

Note that it is also possible to use `Tutor`_ to develop an MFE.  You can refer
to the `relevant tutor-mfe documentation`_ to get started using it.

.. _Devstack: https://github.com/openedx/devstack

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

Usage
=====

To install frontend-component-footer-edx into your project::

   npm i --save @edx/frontend-component-footer-edx

Component Usage::

   import Footer from '@edx/frontend-component-footer-edx';
   import footerMessages from '@edx/frontend-component-footer-edx/src/i18n/index';

   ...

   <Footer
      onLanguageSelected={(languageCode) => {/* set language */}}
      supportedLanguages={[
         { label: 'English', value: 'en'},
         { label: 'Español', value: 'es' },
      ]}
   />

- onLanguageSelected (optional)
- supportedLanguages (optional)

Cloning and Startup
===================

.. code-block::


  1. Clone your new repo:

    ``git clone https://github.com/openedx/frontend-component-footer-edx.git``

  2. Use node v18.x.

    The current version of the micro-frontend build scripts support node 18.
    Using other major versions of node *may* work, but this is unsupported.  For
    convenience, this repository includes an .nvmrc file to help in setting the
    correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

  3. Install npm dependencies:

    ``cd frontend-component-footer-edx && npm ci``

  4. Start the dev server:

    ``npm start``

Requirements
============

This component uses ``@edx/frontend-i18n``. Any containing app must provide ``@edx/frontend-i18n`` as a peer dependency, and be wrapped inside an ``IntlProvider`` element, whether or not your consuming application is actually localized. For a basic default locale (English) version, follow the ``IntlProvider`` example in the sample application in `src/index.jsx <src/index.jsx>`__.

Development
===========

Start the dev server::

   npm i && npm start

Build the component::

   npm run build

License
=======

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Reporting Security Issues
=========================

Please do not report security issues in public. Please email security@openedx.org.

.. |Build Status| image:: https://api.travis-ci.com/edx/frontend-component-footer-edx.svg?branch=master
   :target: https://travis-ci.com/edx/frontend-component-footer-edx
.. |npm_version| image:: https://img.shields.io/npm/v/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |npm_downloads| image:: https://img.shields.io/npm/dt/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-component-footer-edx.svg
   :target: @edx/frontend-component-footer-edx
.. |semantic-release| image:: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
   :target: https://github.com/semantic-release/semantic-release
