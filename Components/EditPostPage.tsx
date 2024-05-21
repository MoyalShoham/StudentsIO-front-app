import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, StatusBar } from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import PostModel from '../Model/PostModel';
import UserModel, { User } from '../Model/UserModel';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


const EditPostScreen: FC<{
    route: any,
}> = ({ route }) => {
    const { _id } = route.params;
    const navigator = useNavigation();
    const [im, setIm] = useState('none')
    const [message, setMessage] = useState('');

    


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
                setIm(res.assets[0].uri);
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
                setIm(res.assets[0].uri);
                console.log(res.assets[0].uri);
            }
        } catch (err) {
            console.log(err)
        }
    
    }
    const upload_image = async () => {
        let body = new FormData();
        body.append('file', {uri: im, name: "post-picture", type: 'image/jpeg'});
        let url = 'http://172.20.10.4:3000/files/file';
        const res = await axios.post(url, body);
        console.log('\n\nthissssssss\n\n\nres.data:', res.data);
        setIm(res.data.url);
        const post: any = {
            date: new Date().toISOString(),
            owner: (await UserModel.getUser())._id,
            message: message,
            image: res.data.url,
        } 
        return post;

    }


    useEffect(() => {
        request_permission();
        
    }, []);
    const onCancel = () => {
        console.log('Cancel');
        navigator.navigate('My-Posts' as never);
    }


    const onSave = async () => {
        const post = await upload_image();
        console.log(post);
        PostModel.editPost(post, _id);
        navigator.navigate('My-Posts' as never);
        
    };


    useEffect(() => {
        console.log('nichnasnu');
        const fetchPost = async () => {
            try {
                const post = await PostModel.getPostById(_id);
                setMessage(post.message);
                setIm(post.image.replace('\\', '/'));
                console.log('image:', post.image)
                console.log(post)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }
        fetchPost();
        
    }, []);



   
    

    return (
            <View style={styles.listrow}>
                <View style={styles.info}>
                    <TextInput
                        style={styles.name}
                        onChangeText={setMessage}
                        value={message}
                        placeholder="Enter your message" 
                        />
                   
                    {
                        im === 'none' ?
                            <Image style={styles.image} source={require('../assets/avatar.jpeg')} />
                            :
                            <Image style={styles.image} source={{ uri: im }} />
                    }

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={select_image}>
                            <Ionicons name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={open_gallery}>
                            <Ionicons name="image" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onSave}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                    

                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    listrow: {
        marginHorizontal: 5,
        marginVertical: 1,
        flexDirection: 'row',
        elevation: 1,
        borderRadius: 2
    },
    avatar: {
        margin: 10,
        height: 100,
        width: 100
    },
    image:{
        margin: 10,
        height: 150,
        width: 200
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    name: {
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold'
    },
    other: {
        marginBottom: 5,
        fontSize: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },container: {
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

export default EditPostScreen;
