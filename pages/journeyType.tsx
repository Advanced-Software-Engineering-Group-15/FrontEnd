import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const journeyTypes = ['DRIVING', 'BICYCLING', 'WALKING'];

const JourneyType = (props: any) => {
  const userProps = props.navigation.state.params.userProps;
  const [journeyStatus, setJourneyStatus] = useState('Pending');
  const [journeyType, setJourneyType] = useState('');

  const isDaily = () => {
    setJourneyStatus('Daily');
  };
  const isPending = () => {
    setJourneyStatus('Pending');
  };
  const createJourney = () => {
    if (journeyType !== '') {
      props.navigation.navigate('OriginIn', { userProps, journeyType, currentStatus: journeyStatus });
    }
  };

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }}
      >
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        <SelectDropdown
          data={journeyTypes}
          onSelect={(selectedItem) => {
            setJourneyType(selectedItem);
          }}
          defaultButtonText="Select Journey Type"
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
        />

        <View style={styles.dropdownsRow}>
          <TouchableOpacity style={styles.dailyButt} onPress={isPending}>
            <Text style={styles.applyButtTxt}>One Off Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dailyButt} onPress={isDaily}>
            <Text style={styles.applyButtTxt}>Set as Daily</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.ViewJourneyBtn} onPress={createJourney}>
          <Text style={styles.homePageBtnText}>Submit Information</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
  ViewJourneyBtn: {
    width: '45%',
    backgroundColor: '#33FF99',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    // marginLeft: '27%',
  },
  homePageBtnText: {
    color: '#000000',
    fontSize: 18,
    height: 30,
  },
  dropdownsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
  },
  dailyButt: {
    width: '40%',
    maxHeight: 50,
    backgroundColor: 'cyan',
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
    marginRight: '20%',
  },
  applyButtTxt: {
    color: '#111111',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginBtn: {
    width: '80%',
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

export default JourneyType;
