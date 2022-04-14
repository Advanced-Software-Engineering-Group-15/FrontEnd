// import { StatusBar } from 'expo-status-bar';
import React, {
  useState, useRef, useCallback,
} from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Alert, Button,
} from 'react-native';
import axios from 'axios';

import Recaptcha from 'react-native-recaptcha-that-works';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IP } from '../constants.tsx';

const Login = (props: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const $recaptchaSignIn = useRef(null);
  const $recaptchaSignUp = useRef(null);

  const handleOpenPressSignIn = useCallback(() => {
    // @ts-ignore
    $recaptchaSignIn.current!.open();
  }, []);

  const handleClosePressSignIn = useCallback(() => {
    // @ts-ignore
    $recaptchaSignIn.current!.close();
  }, []);

  const handleOpenPressSignUp = useCallback(() => {
    // @ts-ignore
    $recaptchaSignUp.current!.open();
  }, []);

  const handleClosePressSignUp = useCallback(() => {
    // @ts-ignore
    $recaptchaSignUp.current!.close();
  }, []);

  const SignIn = () => {
    // alert("sign in");
    const url = `http://${IP}/sign-in`;
    const data = {
      userName,
      password,
    };
    console.log(data);
    axios.post(url, {
      body: JSON.stringify(data),
    }).then((response) => {
      const isLogin = response.data.isLoginSuccessful;
      const userProps = response.data.userProps;

        console.log(userProps)
        console.log(isLogin);
        if (isLogin) {
          // Check for login status
          props.navigation.navigate("Home", {
            userProps: userProps,
            signIn: true
          })
        }
        else {
          return Alert.alert("Login details incorrect,", "please try again",
            [
              {
                text: "OK",
                onPress: () => {
                  console.log("Login failed");
                  console.log("LOGIN DETAILS: ", userName, password)
                }
              }
            ]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SignUp = () => {
    // console.log(input);
    props.navigation.navigate('CreateNewUserPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Carma</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUserName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleOpenPressSignIn}>
        <Text
          style={styles.loginText}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleOpenPressSignUp}>
        <Text style={styles.loginText}>
          SIGN UP
        </Text>
      </TouchableOpacity>
      <SafeAreaView>
        <Recaptcha
          ref={$recaptchaSignIn}
          lang="en"
          headerComponent={(
            <SafeAreaView>
              <Button title="Close" onPress={handleClosePressSignIn} />
            </SafeAreaView>
          )}
          footerComponent={(
            <SafeAreaView>
              <Text>Footer here</Text>
            </SafeAreaView>
          )}
          loadingComponent={(
            <>
              <ActivityIndicator color="green" />
              <Text>Loading reCaptcha...</Text>
            </>
          )}
          siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
          baseUrl="http://127.0.0.1"
          size="normal"
          theme="light"
          style={{ backgroundColor: 'rgba(0,63,92,0.7)' }}
          onLoad={() => {}}
          // onClose={() => alert('onClose event')}
          onError={(err) => {
            // alert('onError event');
            console.warn(err);
          }}
          onExpire={() => alert('onExpire event')}
          onVerify={() => {
            // alert('onVerify event');
            SignIn();
            // setKey(token);
          }}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Recaptcha
          ref={$recaptchaSignUp}
          lang="en"
          headerComponent={(
            <SafeAreaView>
              <Button title="Close" onPress={handleClosePressSignUp} />
            </SafeAreaView>
          )}
          footerComponent={(
            <SafeAreaView>
              <Text>Footer here</Text>
            </SafeAreaView>
          )}
          loadingComponent={(
            <>
              <ActivityIndicator color="green" />
              <Text>Loading reCaptcha...</Text>
            </>
          )}
          siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
          baseUrl="http://127.0.0.1"
          size="normal"
          theme="light" // 003f5c
          style={{ backgroundColor: 'rgba(0,63,92)' }}
          onLoad={() => {}}
          // onClose={() => alert('onClose event')}
          onError={(err) => {
            // alert('onError event');
            console.warn(err);
          }}
          onExpire={() => alert('onExpire event')}
          onVerify={() => {
            // alert('onVerify event');
            SignUp();
            // setKey(token);
          }}
        />
      </SafeAreaView>
    </View>
  );
};

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '70%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
    textAlign: 'center',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '35%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default Login;
