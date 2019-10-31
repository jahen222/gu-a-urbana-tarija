import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Block, Text, theme } from "galio-framework";
//Components
import Header from '../components/Header';
import { Drawer } from '../components/';
import Menu from './Menu';
//Screens
import HomeScreen from '../screens/Home';
import CompaniesScreen from '../screens/companies/CompaniesScreen';
import CompanyDetailsScreen from '../screens/companies/CompanyDetailsScreen';
import CompanyMapScreen from '../screens/companies/CompanyMapScreen';
import RoutesScreen from '../screens/routes/RoutesScreen';
import RouteDetailsScreen from '../screens/routes/RouteDetailsScreen';
import TourismScreen from '../screens/tourism/TourismScreen';
import TourismDetailsScreen from '../screens/tourism/TourismDetailsScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const ScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search title="Home" navigation={navigation} />,
    })
  },
  Companies: {
    screen: CompaniesScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search title="Empresas" navigation={navigation} />,
    })
  },
  Routes: {
    screen: RoutesScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search title="Rutas" navigation={navigation} />,
    })
  },
  Tourism: {
    screen: TourismScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search title="Turismo" navigation={navigation} />,
    })
  },
  CompanyDetails: {
    screen: CompanyDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Detalles Empresa" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  CompanyMap: {
    screen: CompanyMapScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Mapa Empresa" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  RouteDetails: {
    screen: RouteDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Detalles Ruta" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  TourismDetails: {
    screen: TourismDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Detalles Turismo" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header white transparent title="Logout" navigation={navigation} />,
    })
  }
},
{
    initialRouteName: 'Companies'
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const drawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Companies: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Companies" title="Compañias" />
        ),
      }),
    },
    Tourism: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Tourism" title="Turismo" />
        ),
      }),
    },
    Routes: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Routes" title="Rutas" />
        ),
      }),
    },
    MenuDivider: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    Profile: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Perfil" />
        ),
      }),
    },
    Logout: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        ),
      }),
    },
    CompanyDetails: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    CompanyMap: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    TourismDetails: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    RouteDetails: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
  },
  Menu
);

export default drawerNavigator;
