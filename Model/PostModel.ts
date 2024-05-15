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
    return data.find((post) => post._pid == id);
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

export default { getAllPosts, getPost, addPost, deletePost };