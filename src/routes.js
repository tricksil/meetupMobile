import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import * as NavigationServices from '~/services/navigation';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer ref={(ref) => NavigationServices.setNavigator(ref)}>
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
          <Tab.Navigator
            tabBarOptions={{
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#2b1a2f',
                borderTopColor: 'rgba(43, 26, 47, 0.5)',
              },
            }}
          >
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: 'Meetups',
                tabBarIcon: ({ color }) => (
                  <Icon name="format-list-bulleted" size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Subscriptions"
              component={Subscriptions}
              options={{
                title: 'Inscrições',
                tabBarIcon: ({ color }) => (
                  <Icon name="local-offer" size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Perfil',
                tabBarIcon: ({ color }) => (
                  <Icon name="person" size={20} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default Routes;
