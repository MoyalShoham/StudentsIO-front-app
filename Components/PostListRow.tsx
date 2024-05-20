import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import PostModel from '../Model/PostModel';
import UserModel, { User } from '../Model/UserModel';

const Post_List_Row: FC<{
    owner: string,
    message: string,
    _id: string,
    date: Date,
    image: string,
    onItemSelected: (id: string) => void
}> = ({ _id, message, image, date, owner, onItemSelected }) => {

    const [user, setUser] = useState<User | null>(null);
    const [profile_picture, setProfile_picture] = useState('none');
    const [im, setIm] = useState('none')
    const fetchUser = async () => {
        try {
            const fetchedUser = await UserModel.getUser();
            setUser(fetchedUser);
            setProfile_picture(user?.profile_picture.replace('\\', '/') ?? 'none');
            console.log(profile_picture);
            setIm(image.replace('\\', '/'));
            console.log('image:', image)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    

    useEffect(() => {
        fetchUser();
    }, []);

    const onPress = () => {
        onItemSelected(_id);
    };

    if (!owner) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.listrow}>
                {
                    profile_picture === 'none'  ?
                        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                        :
                        <Image style={styles.avatar} source={{ uri: profile_picture }} />
                }
                <View style={styles.info}>
                    <Text style={styles.name}>
                        {user ? user.full_name : 'Loading...'}
                    </Text>
                    <Text style={styles.other}>{user ? `${user.faculty} year: ${user.year}` : ''}</Text>
                    <Text style={styles.other}>{message}</Text>
                    <Text style={styles.other}>{date.toString()}</Text>
                    <Text style={styles.other}>{_id}</Text>
                    {
                        im === 'none' ?
                            <Image style={styles.image} source={require('../assets/avatar.jpeg')} />
                            :
                            <Image style={styles.image} source={{ uri: im }} />
                    }
                </View>
            </View>
        </TouchableOpacity>
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
    }
});

export default Post_List_Row;
