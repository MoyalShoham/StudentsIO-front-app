import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserAddPage from './Components/Register';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Home' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="Sign Up" component={UserAddPage} options={{ title: 'Sign Up' }} />
    </StudentsListStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Sign Up" component={UserAddPage} options={{ title: 'Add New Student' }} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
  },

});


