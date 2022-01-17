// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';

//what is returned on screen
//export default function App() {
export default class App extends React.Component {
  // const ip = '10.36.5.112'
  // const localHost = 'http://'+ip+':5000/'

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(localHost);
  //     const json = await response.json();
  //     console.log(JSON.stringify(json.msg))
  //     setData(json.msg);
  //   } catch (error) { 
  //     console.log(error);
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);
  state={
    username:"",
    // password:""
  };

  logValue = () => {
    console.log(this.state.username);
  };

  render(){
  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Carma</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        {/* <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View> */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text 
          style={styles.loginText}
          onPress={this.logValue}
          >LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

      </View>
  );
  }
};

//styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});