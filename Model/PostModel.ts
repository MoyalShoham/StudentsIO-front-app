import axios from "axios";
import UserModel, { User } from "./UserModel";

export type Post = {
    owner: string;
    message: string;
    _id?: string;
    image: string;
    date: string;
}

const data: Post[] = [
];

const getAllPosts = async (): Promise<Post[]> => {
    try {
        await UserModel.checkUser();
        const response = await axios.get('http://172.20.10.4:3000/post/all/posts', {
            headers: { Authorization: `Bearer ${UserModel.getAccessTokens()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error if you want to handle it outside this function
    }
}

const getPostById = async (id: string): Promise<Post> => {
    const response = await axios.get(`http://172.20.10.4:3000/post/${id}`);
    return response.data;
}



const getPost = async (id: string): Promise<Post | undefined> => {
    const accessToken = UserModel.getAccessTokens();
    const p = axios.get(`http://172.20.10.4:3000/post/`, {
        headers: { "Authorization": "Bearer " + accessToken }
    });
    return (await p).data;
}

const addPost = async (post: Post) => {
    const accessToken = UserModel.getAccessTokens();
    try{

        console.log('access token Post: ', (await accessToken).toString());
        await axios.post('http://172.20.10.4:3000/post/upload', post, {
            headers: { "Authorization": "Bearer " + (await accessToken).toString() }
        }).then((res) => {console.log(res.data)});
    } catch (err) {

        console.log(err);
    }
    
    
}

const deletePost = async (id: string) => {
    const accessToken = UserModel.getAccessTokens();
    try {
        await axios.delete(`http://172.20.10.4:3000/post/${id}`, {
            headers: { "Authorization": "Bearer " + (await accessToken).toString() }
        });
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; // Re-throw the error if you want to handle it outside this function
    }
}

const getMyPosts = async (): Promise<Post[]> => {
    const accessToken = UserModel.getAccessTokens();
    try {
        const response = await axios.get('http://172.20.10.4:3000/post/my/posts', {
            headers: { "Authorization": "Bearer " + (await accessToken).toString() }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error if you want to handle it outside this function
    }
}

const editPost = async (post: Post, id: string) => {
    const accessToken = UserModel.getAccessTokens();
    try {

        await axios.put(`http://172.20.10.4:3000/post/${id}`, post, {
            headers: { "Authorization": "Bearer " + (await accessToken).toString() }
        });
    } catch (error) {
        console.error('Error editing post:', error);
        throw error; // Re-throw the error if you want to handle it outside this function
    }
}

const getOwner = async (id: string): Promise<User> => {
    const post = getPost(id);
    
    const user = await UserModel.getUser();
    // const u = user?.data;
    return user as User;
}

export default {editPost, getPostById, getMyPosts, getAllPosts, getPost, addPost, deletePost, getOwner };