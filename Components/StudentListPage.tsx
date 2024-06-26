import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Button } from "react-native";
import StudentListRow from "./StudentListRow";
import UserModel, { User } from "../Model/UserModel";

const StudentListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<User[]>([]);
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('StudentDetailsPage', { id: id });
    }
    let user: User[] = [];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
        console.log('focus')
        let users: User[] = []
        try {
            users = await UserModel.getAllUsers()
        } catch (err) {
            console.log("fail fetching students " + err)
            setData(Array<User>())
        }
        setData(users)
    })
        return unsubscribe
    });


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Add"
                />
            ),
        })
    }, [])


    return (
        <FlatList
            style={styles.flatList}
            data={user}
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