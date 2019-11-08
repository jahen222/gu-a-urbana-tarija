import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Notification')}>
    <Icon
      family="feather"
      size={16}
      name="alert-circle"
      color={theme.COLORS[isWhite ? 'WHITE' : 'WHITE']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  state = {
      search: '',
  };
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    switch (routeName) {
      case 'Home':
        return ([
          <BasketButton key='basket1' navigation={navigation} isWhite={white} />
        ]);
      case 'Companies':
        return ([
          <BasketButton key='basket2' navigation={navigation} isWhite={white} />
        ]);
      case 'Routes':
        return ([
          <BasketButton key='basket3' navigation={navigation} isWhite={white} />
        ]);
      case 'Tourism':
        return ([
          <BasketButton key='basket4' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="¿Qué Estas Buscando?"
        value={this.state.search}
        onChangeText={search => this.setState({ search })}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" onPress={() => navigation.navigate('Search', {search: this.state.search})} family="entypo" />}
      />
    )
  }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab]} onPress={() => navigation.navigate('CompanyCategories')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Categorias'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderTourism = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab]} onPress={() => navigation.navigate('TourismSearch', { category: "ciudad" })}>
          <Block row middle>
            <Icon name="home" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Ciudad'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('TourismSearch', { category: "campo" })}>
          <Block row middle>
            <Icon name="image" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Campo'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderNav = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs2}>
        <Button shadowless style={[styles.tab]} onPress={() => navigation.navigate('Companies')}>
          <Block row middle>
            <Icon name="briefcase" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Empresas'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Tourism')}>
          <Block row middle>
            <Icon name="camera" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Turismo'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Routes')}>
          <Block row middle>
            <Icon name="map" family="feather" style={{ paddingRight: 8, color: 'white' }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Rutas'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs, tourism, nav } = this.props;
    if (search || tabs || tourism || nav) {
      return (
        <Block center style={{ backgroundColor: "#3b6dc7" }}>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
          {tourism ? this.renderTourism() : null}
          {nav ? this.renderNav() : null}
        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    //right={this.renderRight()}
    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ flex: 0.3, paddingTop: 2  }}
          leftIconName="navicon"
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.WHITE}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'WHITE']},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
    backgroundColor: "#3333ff",
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tabs2: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.33,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    color: 'white',
  },
})
