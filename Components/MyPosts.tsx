import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Button } from "react-native";
import UserModel, { User } from "../Model/UserModel";
import PostModel, { Post } from "../Model/PostModel";
import Post_List_Row from "./PostListRow";

const MyPostsScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const accessToken = UserModel.getAccessTokens();
    const [data, setData] = useState<Post[]>([]);
    
    const onItemSelected = (_id: string) => {
        navigation.navigate('Edit-Post', { _id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
        console.log('focus')
        let posts: Post[] = [];
        try {
            posts = await PostModel.getMyPosts();
        } catch (err) {
            setData(Array<Post>());
            console.log("fail fetching posts " + err)
        }
        setData(posts);
        })
        return unsubscribe
    });


    // useEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Button
    //                 onPress={() => navigation.navigate('Add-Post')}
    //                 title="Edit"
    //             />
    //         ),
    //     })
    // }, [])


    const keyExtractor = (item: Post) => item._id as string;

    const renderItem = ({ item }: { item: Post }) => (
        <Post_List_Row
            owner={item.owner}
            message={item.message}
            date={item.date as string}
            image={item.image}
            _id={item._id as string}
            onItemSelected={onItemSelected}
        />
    )


    return (
        <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default MyPostsScreen;