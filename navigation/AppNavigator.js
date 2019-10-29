import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import ThemeNavigator from './Screens';

const switchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Main: MainTabNavigator,
        Theme: ThemeNavigator,
    },
    {
        initialRouteName: 'Theme'
    }
);

export default createAppContainer(switchNavigator);
