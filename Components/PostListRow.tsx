import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import PostModel from '../Model/PostModel';
import UserModel, { User } from '../Model/UserModel';



const Post_List_Row: FC<{
    owner: string,
    message: string,
    _pid: string,
    date: Date,
    image: string,
    onItemSelected: (id: string) => void
}> = ({ _pid, message, image, date, owner, onItemSelected }) => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            setUser(await UserModel.getUser());
        };
        fetchData();
    }, []);

    const onPress = () => {
        onItemSelected(_pid);
    };

    if (!owner) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <TouchableHighlight onPress={onPress} underlayColor={'grey'}>
            <View style={styles.listrow}>
                {
                    user?.profile_picture === '' ?
                        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                        :
                        <Image style={styles.avatar} source={{ uri: user?.profile_picture }} />
                }
                <View style={styles.info}>
                    <Text style={styles.name}>{user?.full_name}</Text>
                    <Text style={styles.other}>{user?.faculty + ' year: ' + user?.year}</Text>
                    <Text style={styles.other}>{message}</Text>
                    <Text style={styles.other}>{'Ahshav'}</Text>
                    {
                        image === '' ?
                            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                            :
                            <Image style={styles.avatar} source={{ uri: image }} />
                    }
                </View>
            </View>
        </TouchableHighlight>
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
