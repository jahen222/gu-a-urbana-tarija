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
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';

import CompaniesScreen from '../screens/companies/CompaniesScreen';
import CompanyCategoriesScreen from '../screens/companies/CompanyCategoriesScreen';
import CompanyDetailsScreen from '../screens/companies/CompanyDetailsScreen';
import CompanyMapScreen from '../screens/companies/CompanyMapScreen';
import CompanySearchScreen from '../screens/companies/CompanySearchScreen';

import TourismScreen from '../screens/tourism/TourismScreen';
import TourismCategoriesScreen from '../screens/tourism/TourismCategoriesScreen';
import TourismDetailsScreen from '../screens/tourism/TourismDetailsScreen';
import TourismMapScreen from '../screens/tourism/TourismMapScreen';
import TourismSearchScreen from '../screens/tourism/TourismSearchScreen';

import RoutesScreen from '../screens/routes/RoutesScreen';
import RoutesCategoriesScreen from '../screens/routes/RoutesCategoriesScreen';
import RoutesDetailsScreen from '../screens/routes/RoutesDetailsScreen';
import RoutesMapScreen from '../screens/routes/RoutesMapScreen';
import RoutesSearchScreen from '../screens/routes/RoutesSearchScreen';

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
      header: <Header search nav title="Home" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Buscar" navigation={navigation} />,
    })
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Notificaciónes" navigation={navigation} />,
    })
  },
  Companies: {
    screen: CompaniesScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search tabs title="Empresas" navigation={navigation} />,
    })
  },
  CompanyCategories: {
    screen: CompanyCategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Categorias de Empresas" navigation={navigation} />,
      headerTransparent: true,
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
  CompanySearch: {
    screen: CompanySearchScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Busqueda" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Tourism: {
    screen: TourismScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search tourism title="Turismo" navigation={navigation} />,
    })
  },
  TourismCategories: {
    screen: TourismCategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Categorias de Turismo" navigation={navigation} />,
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
  TourismMap: {
    screen: TourismMapScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Mapa Turismo" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  TourismSearch: {
    screen: TourismSearchScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Busqueda" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Routes: {
    screen: RoutesScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search title="Rutas" navigation={navigation} />,
    })
  },
  RoutesCategories: {
    screen: RoutesCategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Categorias de Rutas" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  RoutesDetails: {
    screen: RoutesDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Detalles Ruta" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  RoutesMap: {
    screen: RoutesMapScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Mapa Ruta" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  RoutesSearch: {
    screen: RoutesSearchScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Busqueda" navigation={navigation} />,
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
    initialRouteName: 'Home'
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const drawerNavigator = createDrawerNavigator(
  {
    Profile: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Home: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Search: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Notification: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Companies: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Companies" title="Empresas" />
        ),
      }),
    },
    CompanyCategories: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
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
    CompanySearch: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Tourism: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Tourism" title="Turismo" />
        ),
      }),
    },
    TourismCategories: {
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
    TourismMap: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    TourismSearch: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Routes: {
      screen: ScreenStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Routes" title="Rutas" />
        ),
      }),
    },
    RoutesCategories: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    RoutesDetails: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    RoutesMap: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    RoutesSearch: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    MenuDivider: {
      screen: ScreenStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    Logout: {
      screen: ScreenStack,
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
