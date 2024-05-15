import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Button } from "react-native";
import StudentListRow from "./StudentListRow";
import UserModel, { User } from "../Model/UserModel";

const StudentListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<User[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('StudentDetailsPage', { id: id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setData([...UserModel.getAllUsers()])
            console.log("screen in focus")
        })
        return unsubscribe
    }, [navigation])


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('Sign Up')}
                    title="Add"
                />
            ),
        })
    }, [])

    return (
        <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={(item) => item._id ?? ''}
            renderItem={({ item }) => (
                <StudentListRow
                    full_name={item.full_name}
                    profile_picture={item.profile_picture}
                    faculty={item.faculty}
                    year={item.year}
                    gender={item.gender}
                    _id={item._id ?? ''}
                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default StudentListPage;