import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, View, TextInput, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../config/Firebase.js';
import { Block, Button, Text, Input, theme } from 'galio-framework';
import materialTheme from '../../constants/Theme';
import Images from '../../constants/Images';
import { Select, Icon, Header, Product, Switch } from '../../components/';

const { height, width } = Dimensions.get('screen');

class SignupScreen extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleSignUp = async () => {
        try {
            const { email, password } = this.state;
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password);
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email
                }
                db.collection('users').doc(response.user.uid).set(user);
                this.props.navigation.navigate('Main');
            }
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
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                <Button
                    title="¿Ya estas registrado?, Entra"
                    onPress={() => this.props.navigation.goBack()}
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
                    onPress={this.handleSignUp}>
                    REGISTRAR
                  </Button>
                  <Button
                    shadowless
                    style={styles.button}
                    color='#00000'
                    onPress={() => this.props.navigation.goBack()}>
                    Volver
                  </Button>
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

export default SignupScreen;
