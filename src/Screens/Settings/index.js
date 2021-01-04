import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const Settings = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'red',
  },
});
