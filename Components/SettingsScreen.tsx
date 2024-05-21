import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import UserModel from '../Model/UserModel';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
    const navigator = useNavigation();
    const handleLogout = async () => {
        await UserModel.log_out();
        navigator.navigate('Start-Page' as never);
        // Implement logout logic here
    };

    const handleEditPosts = () => {
        navigator.navigate('My-Posts' as never);
        // Navigate to EditPostsScreen
    };

    const handleEditUser = () => {
        navigator.navigate('Edit-User' as never);
        // Navigate to EditUserScreen
    };

    const handleResetPassword = () => {
        // Navigate to ResetPasswordScreen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button title="Log Out" onPress={handleLogout} />
            <Button title="Edit Posts" onPress={handleEditPosts} />
            <Button title="Edit User" onPress={handleEditUser} />
            <Button title="Reset Password" onPress={handleResetPassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});


export default SettingsScreen;

