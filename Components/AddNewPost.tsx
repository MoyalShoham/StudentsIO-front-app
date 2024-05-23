import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import UserModel, { User } from "../Model/UserModel";
// import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormData from "form-data";
import axios from "axios";
import PostModel, { Post } from "../Model/PostModel";

const PostAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [full_name, setFullName] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("../assets/avatar.jpeg");
  const [date, setDate] = useState("");
  const [owner, setOwner] = useState("");
  UserModel.getUser().then((res) => {
    setFullName(res.full_name);
    setProfilePicture(res.profile_picture);
    setOwner(res._id as string);
  });

  const request_permission = async () => {
    const res = await ImagePicker.requestCameraPermissionsAsync();
    if (!res.granted) {
      alert("you need accept camera permission");
    }
  };

  const select_image = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        setImage(res.assets[0].uri);
        console.log(res.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const open_gallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        setImage(res.assets[0].uri);
        console.log(res.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const upload_image = async () => {
    let body = new FormData();
    setDate(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
    body.append("file", {
      uri: image,
      name: full_name + "profile-picture",
      type: "image/jpeg",
    });
    let url = "http://172.20.10.4:3000/files/file";
    const res = await axios.post(url, body);
    setImage(res.data.url);
    const post: Post = {
      owner: owner,
      message: message,
      image: res.data.url,
      date: date,
    };
    return post;
  };

  useEffect(() => {
    request_permission();
  }, []);
  const onCancel = () => {
    console.log("Cancel");
    navigation.navigate("Home-Page");
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      const post = await upload_image();
      PostModel.addPost(post);
      navigation.navigate("Home-Page");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <View style={styles.container}>
          {image === "../assets/avatar.jpeg" ? (
            <Image
              style={styles.avatar}
              source={require("../assets/avatar.jpeg")}
            />
          ) : (
            <Image style={styles.avatar} source={{ uri: image }} />
          )}

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={select_image}>
              <Ionicons name="camera" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={open_gallery}>
              <Ionicons name="image" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
            placeholder={`what you want to share, ${full_name}?`}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
            {isLoading ? (
        <ActivityIndicator size="large" color={"light-blue"} /> // Display the loading indicator
      ) : ( 
            <TouchableOpacity style={styles.button} onPress={onSave}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
            )}
            
    
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    // alignItems: 'center',
    // justifyContent: 'center',
    width: "100%",
    // paddingHorizontal: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "blue",
  },
  avatar: {
    alignSelf: "center",
    height: 200,
    width: 200,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    padding: 10,
  },
});

export default PostAddPage;
