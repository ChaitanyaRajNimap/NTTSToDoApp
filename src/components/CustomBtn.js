import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/Theme';

const CustomBtn = ({onPress, title, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.btnStyle, props.customBtnStyle]}
      onPress={() => onPress()}>
      <Text style={[styles.btnText, props.customTextStyle]}> {title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnStyle: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: COLORS.blue100,
  },
  btnText: {
    color: COLORS.white200,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
