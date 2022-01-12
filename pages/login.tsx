import React, { useEffect, useState }  from "react";
import { Text, View } from 'react-native';


const Login = () => {
  
  const ip = ''
  const localHost = 'http://'+ip+':5000/'

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      console.log(JSON.stringify(json.msg))
      setData(json.msg);
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      getData();
    }, []);

  return (
    <View style={{ backgroundColor: 'gray', flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{data}</Text>   
    </View>
  );
}

export default Login;