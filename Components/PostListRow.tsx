import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
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

    const [user, setUser] = useState<User>();

    const getUser = async (id: string): Promise<User> => {
        setUser(await UserModel.getUserById(id));
        return user as User;
    }
    useEffect(() => {
        const fetchData = async () => {
            // setUser(await UserModel.getUser());
            getUser(owner);
        };
        fetchData();
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
                    user?.profile_picture === '' ?
                        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                        :
                        <Image style={styles.avatar} source={{ uri: user?.profile_picture }} />
                }
                <View style={styles.info}>
                    {owner &&  (
                        <Text style={styles.name}>
                            { user ? user.full_name : 'Fuck me...'}
                        </Text>
                    )}
                    <Text style={styles.other}>{user?.faculty + ' year: ' + user?.year}</Text>
                    <Text style={styles.other}>{message}</Text>
                    <Text style={styles.other}>{date.toString()}</Text>
                    <Text style={styles.other}>{_id}</Text>

                    {image === '' ? (
                        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
                    ) : (
                        <Image style={styles.avatar} source={{ uri: image }} />
                    )}
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
