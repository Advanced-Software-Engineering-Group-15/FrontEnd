import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';

const MoreOptions = (props: any) => {
  const logOut = () => {
    props.navigation.navigate('Login');
  };

  const myProfile = () => {
    props.navigation.navigate('MyProfile', { props });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ListOfItems}>
        <TouchableOpacity
          style={styles.ListItem}
          onPress={myProfile}
        >
          <View style={styles.ListItemInnerContext}>
            <Text style={styles.TextStyles}>My profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ListItem}>
          <View style={styles.ListItemInnerContext}>
            <Text style={styles.TextStyles}>Give Feeback</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ListItem}>
          <View style={styles.ListItemInnerContext}>
            <Text style={styles.TextStyles}>About Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ListItem}
          onPress={logOut}
        >
          <View style={styles.ListItemInnerContext}>
            <Text style={styles.TextStyles}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  ListOfItems: {
    marginTop: 20,
  },
  ListItem: {
    backgroundColor: '#f6f6f6ff',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  ListItemInnerContext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextStyles: {
    fontSize: 15,
    color: '#676767ff',
    fontWeight: '400',
  },
});
