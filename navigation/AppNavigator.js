import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const switchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Drawer: DrawerNavigator
    },
    {
        initialRouteName: 'Auth'
    }
);

export default createAppContainer(switchNavigator);
