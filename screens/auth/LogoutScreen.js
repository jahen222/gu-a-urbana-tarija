import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, View, TextInput, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../config/Firebase.js';
import { Block, Button, Text, Input, theme } from 'galio-framework';
import materialTheme from '../../constants/Theme';
import Images from '../../constants/Images';
import { Select, Icon, Header, Product, Switch } from '../../components/';

const { height, width } = Dimensions.get('screen');

class LogoutScreen extends React.Component {

    getUser = async (uid) => {
        try {
            const user = await db.collection('users').doc(uid).get();
        } catch (e) {
            alert(e);
        }

        return user;
    };

    componentDidMount = () => {
        /*Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this.getUser(user.uid) == null) {
                    this.props.navigation.navigate('Auth');
                }
            }
        });*/
    };

    handleLogout = () => {
        Firebase.auth().signOut();
        this.props.navigation.navigate('Auth');
    };

    render(){
        return (
          <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex center>
              <ImageBackground
                source={ Images.Onboarding }
                style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
              />
            </Block>
            <Block flex space="between" style={styles.padded}>
              <Block flex space="around" style={{ zIndex: 2 }}>
                <Block center>
                  <Text color="white" size={35}>¿Quieres salir?</Text>
                </Block>
                <Block center>
                  <Button
                    shadowless
                    style={styles.button}
                    color={materialTheme.COLORS.BUTTON_COLOR}
                    onPress={this.handleLogout}>
                    SALIR
                  </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        );
    }
};

LogoutScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default LogoutScreen;
