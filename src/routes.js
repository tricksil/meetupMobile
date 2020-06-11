import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = (ref) => {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer ref={ref}>
      {!signed ? (
        <>
          <Stack.Navigator
            headerMode="none"
            screenOptions={{
              header: () => null,
            }}
          >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default forwardRef(Routes);
