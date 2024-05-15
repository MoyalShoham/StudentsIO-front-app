export type User = {
    _id?: string;
    full_name: string;
    email: string;
    password: string;
    gender: string;
    profile_picture: string;
    tokens: string[];
    posts: string[];
    year: string;
    faculty: string;


};

const data: User[] = [
];



const getAllUsers = (): User[] => {
    return data;
}

const getUser = (id: string): User | undefined => {
    return data.find((user) => user._id == id);
}

const addUser = (user: User) => {
    data.push(user);
}

const deleteUser = (id: string) => {
    const index = data.findIndex((user) => user._id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllUsers, getUser, addUser, deleteUser };