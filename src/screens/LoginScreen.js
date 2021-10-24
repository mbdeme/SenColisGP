import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import * as firebase from 'firebase'
import { Base64 } from 'js-base64';
import firebaseConfig from '../configs/config.js'
export default function LoginScreen({ navigation }) {
var that = this;
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errorMessage, setErrorMessage] = useState('');
  const onLoginPressed = () => {
     if (!firebase.apps.length) {
             firebase.initializeApp(firebaseConfig);
           }else {
              firebase.app(); // if already initialized, use that one
           }


    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    console.log("email"+email.value);
    console.log("password"+password.value);
    firebase.app().database().ref("users").orderByChild("email")
       .equalTo(email.value).once("value", snapshot => {
              snapshot.forEach(function(child) {
                          if (child.val().password==Base64.encode(password.value)){
navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
                          }
                          else {
                          console.log("password incorrect");
                          setErrorMessage("Ooops login ou identifiant incorrect!")
                                return
                          }
                      });

            });
           // setGlobal();
        setErrorMessage("Ooops login ou identifiant incorrect!")


  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header> Sen GP Colis</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mot de passe"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
       <Text>{errorMessage}</Text>
      <View style={styles.row}>
        <Text>Vous ne disposez pas de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Creer un compte</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
