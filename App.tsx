import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your components
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import UserAddPage from './Components/Register';
import Sign_In from './Components/Sign-In';
import Home_Page from './Components/Home-Page';
import StartPage from './Components/Start-Page';
import PostAddPage from './Components/AddNewPost';
import EditUserPage from './Components/EditProfilePage';
import SettingsScreen from './Components/SettingsScreen';

// Import your authentication model
import UserModel from './Model/UserModel';

const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen = () => (
  <StudentsListStack.Navigator>
    <StudentsListStack.Screen name="Start-Page" component={StartPage} options={{ title: 'Hello' }} />
    <StudentsListStack.Screen name="Home-Page" component={Home_Page} options={{ title: 'Home' }} />
    <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
    <StudentsListStack.Screen name="Register" component={UserAddPage} options={{ title: 'Sign Up' }} />
    <StudentsListStack.Screen name="Sign_In" component={Sign_In} options={{ title: 'Sign In' }} />
    <StudentsListStack.Screen name="Add-Post" component={PostAddPage} options={{ title: 'Add New Post' }} />
  </StudentsListStack.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await UserModel.isLoggedIn();
      setIsLoggedIn(loggedIn);
    };

    const intervalId = setInterval(checkLogin, 2000); // Check every 2 seconds

    checkLogin(); // Initial check

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array for initial render

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
        {isLoggedIn && <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />}
        {!isLoggedIn && <Tab.Screen name="Sign_In" component={Sign_In} options={{ title: 'Log In' }} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
