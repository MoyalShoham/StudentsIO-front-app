import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Button } from "react-native";
import StudentListRow from "./StudentListRow";
import UserModel, { User } from "../Model/UserModel";
import PostModel, { Post } from "../Model/PostModel";
import Post_List_Row from "./PostListRow";

const Home_Page: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('Post-Details', { _pid: id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
        console.log('focus')
        let posts: Post[] = [];
        try {
            posts = PostModel.getAllPosts()
        } catch (err) {
            console.log("fail fetching posts " + err)
            setData(Array<Post>())
        }
        setData(posts)
    })
        return unsubscribe
    });


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('Add-Post')}
                    title="Add"
                />
            ),
        })
    }, [])


    return (
        <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={(item) => item._pid ?? ''}
            renderItem={({ item }) => (
                <Post_List_Row
                    owner={item.owner}
                    message={item.message}
                    date={item.date}
                    image={item.image}
                    _pid={item._pid ?? ''}                    
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

export default Home_Page;