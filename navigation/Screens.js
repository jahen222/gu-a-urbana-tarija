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
import RoutesScreen from '../screens/routes/RoutesScreen';
import RouteDetailsScreen from '../screens/routes/RouteDetailsScreen';
import TourismScreen from '../screens/tourism/TourismScreen';
import TourismDetailsScreen from '../screens/tourism/TourismDetailsScreen';

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

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      //header: <Header search tabs title="Home" navigation={navigation} />,
      header: <Header search title="Home" navigation={navigation} />,
    })
  }
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const CompaniesStack = createStackNavigator({
  Companies: {
    screen: CompaniesScreen,
    navigationOptions: ({navigation}) => ({
      //header: <Header search tabs title="Home" navigation={navigation} />,
      header: <Header search title="Empresas" navigation={navigation} />,
    })
  }
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const RoutesStack = createStackNavigator({
  Routes: {
    screen: RoutesScreen,
    navigationOptions: ({navigation}) => ({
      //header: <Header search tabs title="Home" navigation={navigation} />,
      header: <Header search title="Rutas" navigation={navigation} />,
    })
  }
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const TourismStack = createStackNavigator({
  Tourism: {
    screen: TourismScreen,
    navigationOptions: ({navigation}) => ({
      //header: <Header search tabs title="Home" navigation={navigation} />,
      header: <Header search title="Turismo" navigation={navigation} />,
    })
  }
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const CompanyDetailsStack = createStackNavigator({
  CompanyDetails: {
    screen: CompanyDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Detalles de empresa" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const drawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Companies: {
      screen: CompaniesStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Companies" title="Compañias" />
        ),
      }),
    },
    Tourism: {
      screen: TourismStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Tourism" title="Turismo" />
        ),
      }),
    },
    Routes: {
      screen: RoutesStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Routes" title="Rutas" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    Profile: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Perfil" />
        ),
      }),
    },
    Logout: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        ),
      }),
    },
  },
  Menu
);

export default drawerNavigator;
