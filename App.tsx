import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserAddPage from './Components/Register';
import Sign_In from './Components/Sign-In';
import Home_Page from './Components/Home-Page';
import StartPage from './Components/Start-Page';
// import PostDetailsPage from './Components/PostDetailsPage';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="Start-Page" component={StartPage} options={{ title: 'Hello' }} />
      <StudentsListStack.Screen name="Home-Page" component={Home_Page} options={{ title: 'Home' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="Register" component={UserAddPage} options={{ title: 'Sign Up' }} />
      <StudentsListStack.Screen name="Sign_In" component={Sign_In} options={{ title: 'Sign In' }} />
      {/* <StudentsListStack.Screen name="Post-Details" component={PostDetailsPage} options={{ title: 'Post Details' }} /> */}

    </StudentsListStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Register" component={UserAddPage} options={{ title: 'Add New Student' }} />

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


