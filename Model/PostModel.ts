import axios from "axios";
import UserModel, { User } from "./UserModel";

export type Post = {
    owner: string;
    message: string;
    _id: string;
    image: string;
    date: Date;
}

const data: Post[] = [
];

const getAllPosts = async (accessToken: string): Promise<Post[]> => {
    try {
        const response = await axios.get('http://172.20.10.4:3000/post/all/posts', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error if you want to handle it outside this function
    }
}

const getPost = async (id: string): Promise<Post | undefined> => {
   const p = axios.get(`http://172.20.10.4:3000/post/${id}`);
   return (await p).data;
}

const addPost = (post: Post) => {
    data.push(post);
}

const deletePost = (id: string) => {
    const index = data.findIndex((post) => post._id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

const getOwner = async (id: string): Promise<User> => {
    const post = getPost(id);
    
    const user = await UserModel.getUser();
    const u = user?.data;
    return u ? u : undefined;
}

export default { getAllPosts, getPost, addPost, deletePost, getOwner };