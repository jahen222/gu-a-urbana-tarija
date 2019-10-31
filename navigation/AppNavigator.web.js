import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
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

switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
