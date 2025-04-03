import 'babel-polyfill';

import React, { StrictMode } from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';
import { initialize, getConfig, subscribe, APP_READY } from '@edx/frontend-platform';
import { AppContext, AppProvider } from '@edx/frontend-platform/react';
import { Footer } from '@edx/frontend-component-footer';

import './index.scss';

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
      <StrictMode>
          <AppProvider>
            <AppContext.Provider
                value={{
                    authenticatedUser: null,
                    config: getConfig(),
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
          </AppProvider>
      </StrictMode>,
  );
});

initialize({
  messages: []
});
