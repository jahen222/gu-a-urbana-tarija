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

    handleLogin = async () => {
        try {
            const { email, password } = this.state;
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password);
            this.getUser(response.user.uid);
        } catch (e) {
            alert(e);
        }
    };

    getUser = async (uid) => {
        try {
            const user = await db.collection('users').doc(uid).get();
            this.props.navigation.navigate('Main');
        } catch (e) {
            alert(e);
        }
    };

    /*render(){
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
              <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Button
                    title="¿No tienes cuenta?, Registrare"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
            </View>
        );
    }*/

    render(){
        const { navigation } = this.props;

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
