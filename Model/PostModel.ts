import UserModel, { User } from "./UserModel";

export type Post = {
    owner: string;
    message: string;
    _pid?: string;
    image: string;
    date: Date;
}

const data: Post[] = [
];

const getAllPosts = (): Post[] => {
    return data;
}

const getPost = (id: string): Post | undefined => {
    const res = data.find((post) => post._pid == id);
    return res ? res : undefined;
}

const addPost = (post: Post) => {
    data.push(post);
}

const deletePost = (id: string) => {
    const index = data.findIndex((post) => post._pid === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

const getOwner = async (id: string): Promise<User> => {
    const post = getPost(id);
    
    const user = await UserModel.getUser(post?.owner);
    const u = user?.data;
    return u ? u : undefined;
}

export default { getAllPosts, getPost, addPost, deletePost, getOwner };