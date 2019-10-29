import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/LoginScreen';
import Signup from '../screens/auth/SignupScreen';

const AuthNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup }
    },
    {
        initialRouteName: 'Login'
    }
);

export default AuthNavigator;
