import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, Alert, TextInput, StatusBar, KeyboardAvoidingView } from 'react-native';
import React, { useState, FC } from 'react';
import UserModel, {User} from '../Model/UserModel';


const Sign_In: FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    // navigate to Home page 
    const onCancel = () => {
        console.log('Cancel');
        navigation.navigate('Start-Page');
    }


    const onLogIn = async () => {
        console.log('Log In');
        const user = {
            email: email,
            password: password,
        }
        
        const bool = await UserModel.log_in(user.email, user.password);

        // navigate to home screen (posts of other users)
        navigation.navigate('Home-Page');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' >
            <ScrollView>
                <View style={styles.container}>
                    
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Enter your email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Enter Password"
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onLogIn}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // paddingHorizontal: 10

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        padding: 10
    }

});


export default Sign_In;
