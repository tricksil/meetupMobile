import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import { store, persistor } from './store';

import * as NavigationServices from '~/services/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#22202C" />
        <Routes ref={(ref) => NavigationServices.setNavigator(ref)} />
      </PersistGate>
    </Provider>
  );
};

export default App;
