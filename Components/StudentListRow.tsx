import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar, TouchableHighlight } from 'react-native';
import React, { useState, FC } from 'react';



const StudentListRow: FC<{
    full_name: string,
    profile_picture: string,
    faculty: string,
    year: string,
    gender: string,
    _id: string,
    onItemSelected: (id: string) => void
}> = ({ full_name, profile_picture, faculty, year, gender, _id, onItemSelected }) => {
    const onPress = () => {
        onItemSelected(_id);
    }
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'grey'}>
            <View style={styles.listrow}>
                <Image style={styles.avatar} source={require(profile_picture)} />
                <View style={styles.info}>
                    <Text style={styles.name}>{full_name}</Text>
                    <Text style={styles.other}>{faculty + 'year:' + year}</Text>
                    <Text style={styles.other}>{'Gender:' + gender}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

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
    }
});

export default StudentListRow;