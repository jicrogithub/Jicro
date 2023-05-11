import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { main } from '../../../utils/colors';
import UniversalHeader from '../../components/Universalheader';
import Button from './../../components/Button';

const DemandService = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show,setShow] = useState(false)
  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'   }).format(date);
      setDate(formattedDate.toLocaleString());
      setShow(true)
    }
  };


  return (
    <KeyboardAvoidingView>
      <UniversalHeader navigation={navigation} />
      <View className="m-2 flex flex-col justify-evenly items-center">
        <View
          style={main.shadows}
          className="bg-white h-[580] flex flex-col p-2 rounded-xl w-full mb-2"
        >
          <View className="w-full h-48 bg-gray-300 rounded-xl mb-2" />
          <View>
            <Text className="text-black text-lg font-semibold ml-1">
              Short Title
            </Text>
            <TextInput
              keyboardType="default"
              cursorColor={'#1c1c1c'}
              className=" rounded-xl h-14 text-black font-bold text-md px-2 mb-2 border-2 border-gray-200"
              placeholder="My Washing Machine is Not Working"
              placeholderTextColor={'#727272'}
            />
            <Text className="text-black text-lg font-semibold ml-1">
              Description
            </Text>
            <TextInput
              multiline={true}
              keyboardType="default"
              cursorColor={'#1c1c1c'}
              className=" rounded-xl h-14 abso text-black font-bold text-md px-2 mb-2 border-2 border-gray-200"
              placeholder="From 4 hours it is not working tried a lot..."
              placeholderTextColor={'#727272'}
            />
            <Text className="text-black text-lg font-semibold ml-1">
              Money to be Paid
            </Text>
            <TextInput
              keyboardType="number-pad"
              cursorColor={'#1c1c1c'}
              className=" rounded-xl h-14 text-black font-bold text-md px-2 mb-2 border-2 border-gray-200"
              placeholder="₹320"
              placeholderTextColor={'#727272'}
            />
            <Text className="text-black text-lg font-semibold ml-1">
              Schedule
            </Text>
            <Button func={() => {
            setShowDatePicker(true);
          }} text={`${show === true?date: "Select Time"}`} />
          </View>
          
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={handleDateChange}
              accentColor={"#000"}
              textColor={"#000"}
            />
          )}
        </View>
        <Button text="Post" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DemandService;
