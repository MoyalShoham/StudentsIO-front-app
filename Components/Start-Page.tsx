import React from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
    navigation: any;
}

const StartPage: React.FC<Props> = ({ navigation }) => {
    const goToLogin = () => {
        navigation.navigate('Sign_In');
    };

    const goToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View>
            <Text>Welcome to the Start Page!</Text>
            <Button title="Login" onPress={goToLogin} />
            <Button title="Register" onPress={goToRegister} />
        </View>
    );
};

export default StartPage;