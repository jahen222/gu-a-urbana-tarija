import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import Icon from './Icon';
import materialTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused, screen } = this.props;

    switch (screen) {
      case 'Home':
        return (
          <Icon
            size={16}
            name="home"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Companies':
        return (
          <Icon
            size={16}
            name="shop"
            family="GalioExtra"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Tourism':
        return (
          <Icon
            size={16}
            name="aircraft"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Routes':
        return (
          <Icon
            size={16}
            name="shuffle"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Profile':
        return (
          <Icon
            size={16}
            name="user"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Logout':
        return (
          <Icon
            size={16}
            name="log-out"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      case 'Settings':
        return (
          <Icon
            size={16}
            name="cog"
            family="entypo"
            color={materialTheme.COLORS.MUTED} />
        );
      default:
        return null;
    }
  }

  render() {
    const { focused, title } = this.props;

    return (
      <Block flex row style={[styles.defaultStyle, focused ? null : null]}>
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={'black'}>
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
})
