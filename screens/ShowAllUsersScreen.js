import React, {useState, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';

const ShowAllUsersScreen = ({navigation}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsAppMsg, setWhatsAppMsg] = useState('');
  
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Send Whatsapp Message",
            headerBackTitle: "Chats",
        })
    },[navigation]);

    const initiateWhatsApp = () => {
      
      if (mobileNumber.length != 11) {
        alert('Please insert correct WhatsApp number');
        return;
      }
 
      let url =
        'whatsapp://send?text=' + 
         whatsAppMsg +
        '&phone=92' + mobileNumber;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleTextsmall}>
            Enter WhatsApp Number
          </Text>
          <TextInput
            value={mobileNumber}
            onChangeText={
              (mobileNumber) => setMobileNumber(mobileNumber)
            }
            placeholder={'Enter WhatsApp Number'}
            keyboardType="numeric"
            style={styles.textInput}
          />
          <Text style={styles.titleTextsmall}>
            WhatsApp Message
          </Text>
          <TextInput
            value={whatsAppMsg}
            onChangeText={
              (whatsAppMsg) => setWhatsAppMsg(whatsAppMsg)
            }
            placeholder={'WhatsApp Message'}
            style={styles.textInput}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={initiateWhatsApp}>
            <Text style={styles.buttonTextStyle}>
              Send WhatsApp Message
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  

export default ShowAllUsersScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 30,
    },
    titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    titleTextsmall: {
      marginVertical: 8,
      fontSize: 16,
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