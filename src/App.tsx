import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import { persistor, store } from './redux/store';
import { admobInit } from './service/adMob';
import { initLogger } from './service/Logger';

admobInit();
initLogger();

// enableScreens();
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
