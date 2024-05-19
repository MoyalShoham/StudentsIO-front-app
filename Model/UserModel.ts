import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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





const getAllUsers = async () => {
    const res: any = await axios.get('http://172.20.10.4:3000/auth/users')
    let users = Array<User>();
    if (res.data) {
        res.data.forEach((obj: any) => {
            const u: User = {
                full_name: obj.full_name,
                email: obj.email,
                password: obj.password,
                _id: obj._id,
                gender: obj.gender,
                profile_picture: obj.profile_picture,
                tokens: obj.tokens,
                posts: obj.posts,
                year: obj.year,
                faculty: obj.faculty
            };
            users.push(u);
        });
    }
    return users;
}

const log_in = async (email: string, password: string) => {
    return await axios.post('http://172.20.10.4:3000/auth/login', { email, password });
}

const getUser = async ()  => {
    const accessToken = useRoute().params as { accessToken: string };
    const res = await axios.get(`http://172.20.10.4:3000/auth/user`,{ 
        headers: { Authorization: `Bearer ${accessToken}` 
    }
    });
    return res.data;
}

const getUserById = async (id: string): Promise<User>=> {
    const res = await axios.get(`http://172.20.10.4:3000/auth/user/${id}`);
    return res.data;
}

const addUser = async (user: User) => {
    await axios.post('http://172.20.10.4:3000/auth/register', user);
}

const deleteUser = () => {
    return axios.delete('http://172.20.10.4:3000/auth/delete');
    
}

export default { getAllUsers, getUser, addUser, deleteUser, log_in, getUserById };