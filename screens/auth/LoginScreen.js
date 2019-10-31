import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, View, TextInput, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../config/Firebase.js';
import { Block, Button, Text, Input, theme } from 'galio-framework';
import materialTheme from '../../constants/Theme';
import Images from '../../constants/Images';
import { Select, Icon, Header, Product, Switch } from '../../components/';

const { height, width } = Dimensions.get('screen');

class LoginScreen extends React.Component {
    state = {
        email: '',
        password: ''
    };

    componentDidMount = () => {
        console.disableYellowBox = true;
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this.getUser(user.uid) != null) {
                    this.props.navigation.navigate('Drawer');
                }
            }
        });
    };

    getUser = async (uid) => {
        try {
            const user = await db.collection('users').doc(uid).get();
        } catch (e) {
            alert(e);
        }

        return user;
    };

    handleLogin = async () => {
        try {
            const { email, password } = this.state;
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password);
            if (response) {
                if (this.getUser(response.user.uid) != null) {
                    this.props.navigation.navigate('Drawer');
                }
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
                  <Text color="white" size={35}>Guía Urbana Tarija</Text>
                </Block>
                <Block center>
                  <Input
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                  />
                  <Input
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                  />
                </Block>
                <Block center>
                  <Button
                    shadowless
                    style={styles.button}
                    color={materialTheme.COLORS.BUTTON_COLOR}
                    onPress={this.handleLogin}>
                    ENTRAR
                  </Button>
                  <Button
                    shadowless
                    style={styles.button}
                    color='#00000'
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    ¿No tienes cuenta?, Registrate aquí
                  </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        );
    }
};

LoginScreen.navigationOptions = {
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

export default LoginScreen;
