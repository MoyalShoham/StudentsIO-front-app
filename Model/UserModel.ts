import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


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



const getAccessTokens = async () => {
    return await AsyncStorage.getItem('accessToken') as string;
}

const getRefreshTokens = async () => {
    return await AsyncStorage.getItem('refreshToken');
}

const setAccessTokens = async (accessToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
}

const setRefreshTokens = async (refreshToken: string) => {
    await AsyncStorage.setItem('refreshToken', refreshToken);
}

const deleteAccessTokens = async () => {
    await AsyncStorage.removeItem('accessToken');
}

const deleteRefreshTokens = async () => {
    await AsyncStorage.removeItem('refreshToken');
}

const deleteTokens = async () => {
    await deleteAccessTokens();
    await deleteRefreshTokens();
}

const setTokens = async (accessToken: string, refreshToken: string) => {
    await deleteTokens();
    await setAccessTokens(accessToken);
    await setRefreshTokens(refreshToken);
}





const getAllUsers = async () => {
    const res: any = await axios.get('http://172.20.10.4:3000/auth/users');
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
    const res = await axios.post('http://172.20.10.4:3000/auth/login', { email, password });
    console.log('Access Token / userModel: ', res.data.accessToken);
    await setTokens(res.data.accessToken, res.data.refreshToken);
    return true;

    
    
}

const getUser = async () : Promise<User>  => {
    await checkUser();
    const accessToken = await getAccessTokens();
    console.log('Access Token / userModel: ', accessToken);
    const res = await axios.get(`http://172.20.10.4:3000/auth/user`,{ 
        headers: { "Authorization": "Bearer " + accessToken }  
    });
    return res.data;
}

const getUserById = async (id: string): Promise<User>=> {
    await checkUser();
    const res = await axios.get(`http://172.20.10.4:3000/auth/user/${id}`);
    console.log('User:', res.data);
    return res.data;
}

const addUser = async (user: User) => {
    await axios.post('http://172.20.10.4:3000/auth/register', user);
}

const deleteUser = () => {
    return axios.delete('http://172.20.10.4:3000/auth/delete');
    
}

const editUser = async (user: User) => {
    const accessToken = await getAccessTokens();
    await axios.put('http://172.20.10.4:3000/auth/update', user, { headers: { "Authorization": "Bearer " + accessToken } });
}

const isLoggedIn = async () => {
    try {
        const user = await getUser();
        return true;
    } catch (error) {
        return false;
    }
}

const log_out = async () => {
    await deleteTokens();

}
const checkUser = async () => {
    const accessToken = await getAccessTokens();
    console.log('checkk');
    await axios.get('http://172.20.10.4:3000/auth/user',
        {headers: { "Authorization": "Bearer " + accessToken } }
    );
}

export default {checkUser, log_out, isLoggedIn, getAllUsers, getUser, addUser, deleteUser, log_in, getUserById, getAccessTokens, getRefreshTokens, setAccessTokens, setRefreshTokens, deleteAccessTokens, deleteRefreshTokens, deleteTokens, setTokens, editUser};