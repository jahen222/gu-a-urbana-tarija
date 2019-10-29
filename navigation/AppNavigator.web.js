import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

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
        initialRouteName: 'Auth'
    }
);

switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
