import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import NumberPlease from "react-native-number-please";

const countries = ["Drive", "Cycle", "Walk"]
//https://reactnativeexample.com/generate-react-native-pickers-with-range-numbers/
const OrderPizza = () => {
  const initialValues = [{ id: "pizza", value: 3 }];
  const [pizzas, setPizzas] = useState(initialValues);
  const pizzaNumbers = [{ id: "pizza", label: "?", min: 0, max: 99 }];

  return (
    <View>
      <Text>I would like</Text>
      <NumberPlease
        digits={pizzaNumbers}
        values={pizzas}
        onChange={(values) => setPizzas(values)}
      />
    </View>
  );
}

const App = () => {
  return (
    <ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Select Journey Type:</Text>
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <Text>Cost of Journey:</Text>
          
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}

export default App;