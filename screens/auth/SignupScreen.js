import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, View, TextInput, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../config/Firebase.js';
import { Block, Button, Text, Input, theme } from 'galio-framework';
import materialTheme from '../../constants/Theme';
import Images from '../../constants/Images';
import { Select, Icon, Header, Product, Switch } from '../../components/';
import { AppLoading, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('screen');

class SignupScreen extends React.Component {
    state = {
        email: '',
        password: '',
        expoPushToken: ''
    };

    handleSignUp = async () => {
        try {
            const { email, password } = this.state;
            const response = await Firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
            const token = await Notifications.getExpoPushTokenAsync();
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email.trim(),
                    expoPushToken: token
                }
                db.collection('users').doc(response.user.uid).set(user);
                this.props.navigation.navigate('Drawer');
            }
        } catch (e) {
            alert(e);
        }
    };

    render(){
        const { navigation } = this.props;

        return (
          <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex center>
              <ImageBackground
                source={ Images.Onboarding }
                style={{ height: height, width: width, marginTop: '-45%', zIndex: 1 }}
              />
            </Block>
            <Block flex space="between" style={styles.padded}>
              <Block flex space="around" style={{ zIndex: 2 }}>
                <Block center>
                  <Text color="white" size={35}></Text>
                </Block>
                <Block center>
                  <Input
                    placeholder="Email"
                    value={this.state.email.trim()}
                    onChangeText={email => this.setState({ email })}
                    email
                    placeholderTextColor={materialTheme.COLORS.BLACK}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.BLACK }}
                  />
                  <Input
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    password viewPass
                    placeholderTextColor={materialTheme.COLORS.BLACK}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.BLACK }}
                  />
                </Block>
                <Block center>
                  <Button
                    shadowless
                    style={styles.button}
                    color="#3333ff"
                    onPress={this.handleSignUp}>
                    REGISTRAR
                  </Button>
                  <Text h5
                    style={{ paddingTop: 8 }}
                    onPress={() => this.props.navigation.goBack()}>
                    VOLVER
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        );
    }
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
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

export default SignupScreen;
