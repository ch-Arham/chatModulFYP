import React, {useState, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput,} from 'react-native';
import call from 'react-native-phone-call';
import Icon from "react-native-vector-icons/FontAwesome";
const DialScreen = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');


  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Dial Call",
        headerBackTitle: "Chats",
    })
},[navigation]);

  const triggerCall = ({navigation}) => {
    
    if (inputValue.length != 11) {
      alert('Please insert correct contact number');
      return;
    }

    const args = {
      number: inputValue,
      prompt: true, //if the user should be prompt prior to the call
    };
    // Make a call
    call(args).catch(console.error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          value={inputValue}
          onChangeText={(inputValue) => setInputValue(inputValue)}
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
          onSubmitEditing= {triggerCall}
       
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={triggerCall}>
          <Text style={styles.buttonTextStyle}>
            Make a Call
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    textAlign: 'center',
  },

  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#2089dc',
    borderRadius: 3,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});