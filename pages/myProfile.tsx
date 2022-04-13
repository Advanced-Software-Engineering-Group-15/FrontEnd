import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const MyProfile = (props: any) => {
    const username = props.navigation.state.params.props.navigation.state.params.username;
    const consoleLog = () => {
        console.log(props)
        console.log("Username", props.navigation.state.params.props.navigation.state.params.username)
       
      }
    return (
        <View style={styles.container}>
           <View style={styles.TopContainer}>
               <Image style={styles.Image}
               source={require('../assets/blank-profile-picture.png')}
               />
               <View>
                   <Text style={styles.Number}>{username}</Text>
               </View>
               <View>
                   <Text style={styles.Number}>9</Text>
                   <Text style={styles.HeadingName}>Trips Created</Text>
               </View>
               <View>
                   <Text style={styles.Number}>22</Text>
                   <Text style={styles.HeadingName}>Trips Joined</Text>
               </View>
               <TouchableOpacity
                    onPress={consoleLog}>
                   <View>
                        <Text>Console Log</Text>
                   </View>
                </TouchableOpacity>
           </View>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        padding:10,
    },
    TopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
    },
    Image: {
        height: 60,
        width: 60,
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    Number: {
        fontWeight: '400',
        fontSize: 20,
        color: 'blue',
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    HeadingName: {
        fontSize: 20,
        color: 'grey',
        paddingHorizontal:10,
    },
})