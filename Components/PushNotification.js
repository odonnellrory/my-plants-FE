import React, { useState } from "react";
import { Button, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({
  title,
  body,
  buttonTitle = "Schedule Notification",
}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: date,
    });
    alert(`Notification scheduled for ${date.toLocaleString()}`);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || date;
    setShowTimePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Set Date" />
      <Button onPress={showTimepicker} title="Set Time" />
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={onDateChange} />
      )}
      {showTimePicker && (
        <DateTimePicker value={date} mode="time" onChange={onTimeChange} />
      )}
      <Text>Selected Date: {date.toLocaleString()}</Text>
      <Button title={buttonTitle} onPress={scheduleNotification} />
    </View>
  );
};

export default PushNotification;
