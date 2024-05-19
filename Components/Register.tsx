import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, Alert, TextInput, StatusBar, KeyboardAvoidingView } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import UserModel, {User} from '../Model/UserModel';
// import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons'
import FormData from 'form-data';
import axios from 'axios';




const UserAddPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [year, setYear] = useState('');
    const [faculty, setFaculty] = useState('');
    const [gender, setGender] = useState('');
    const [profile_picture, setProfilePicture] = useState('');


    const request_permission = async () => {
        const res = await ImagePicker.requestCameraPermissionsAsync();
        if (!res.granted){
            alert('you need accept camera permission');
        }
    }
    
    const select_image = async () => {
        try{
            const res = await ImagePicker.launchCameraAsync()
            if(!res.canceled && res.assets.length > 0){
                setProfilePicture(res.assets[0].uri);
                console.log(res.assets[0].uri);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const open_gallery = async () => {
        try{
            const res = await ImagePicker.launchImageLibraryAsync()
            if(!res.canceled && res.assets.length > 0){
                setProfilePicture(res.assets[0].uri);
                console.log(res.assets[0].uri);
            }
        } catch (err) {
            console.log(err)
        }
    
    }
    const upload_image = async () => {
        let body = new FormData();
        body.append('file', {uri: profile_picture, name: full_name + "profile-picture", type: 'image/jpg'});
        let url = 'http://172.20.10.4:3000/files/file';
        const res = await axios.post(url, body);

    }

    useEffect(() => {
        request_permission();
    }, []);
    const onCancel = () => {
        console.log('Cancel');
        navigation.navigate('UserListPage');
    }


    const onSave = async () => {
       
        upload_image();
        console.log('Save');
        const user: User = {
            full_name: full_name,
            email: email,
            password: password,
            profile_picture: profile_picture,
            gender: gender,
            tokens: [],
            posts: [],
            year: year,
            faculty: faculty,
        }
        UserModel.addUser(user);
        navigation.navigate('Sign_In');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' >
            <ScrollView>
                <View style={styles.container}>
                    { 
                        (profile_picture === '') ?
                        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                        :
                        <Image style={styles.avatar} source={{ uri: profile_picture }} />
                    }

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={select_image}>
                            <Ionicons name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={open_gallery}>
                            <Ionicons name="image" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                    <TextInput
                        style={styles.input}
                        onChangeText={setFullName}
                        value={full_name}
                        placeholder="Enter your Full Name"
                    />
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
                
                    <TextInput
                        style={styles.input}
                        onChangeText={setGender}
                        value={gender}
                        placeholder="Enter your Gender"
                    />
                <TextInput
                        style={styles.input}
                        onChangeText={setFaculty}
                        value={faculty}
                        placeholder="Enter your Faculty"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setYear}
                        value={year}
                        placeholder="Enter your year of studies"
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onSave}>
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


export default UserAddPage;
