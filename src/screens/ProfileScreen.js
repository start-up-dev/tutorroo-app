import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Profile/Header";
import { Color } from "../const/color";
import IconButton from "../components/Profile/IconButton";
import Space from "../components/common/Space";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "../components/common/Icon";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearRes, logOut } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const editProfile = require("../../assets/images/user-edit.png");
const message = require("../../assets/images/message-text.png");
const changePass = require("../../assets/images/password-check.png");
const notification = require("../../assets/images/notification-bing.png");
const logout = require("../../assets/images/logout.png");

const ProfileScreen = () => {
  //Navigation
  const navigation = useNavigation();

  const userInfo = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const logOutHandler = () => {
    Alert.alert("Are You Sure", "", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("TOKEN");
          dispatch(logOut());
          dispatch(clearRes());
          dispatch(clearError());
          navigation.navigate("Auth");
        },
      },
    ]);
  };
  return (
    <>
      <Header data={userInfo} />
      <View
        style={{ backgroundColor: Color.background, paddingHorizontal: 20 }}
      >
        <IconButton
          title={"Edit Profile"}
          icon={editProfile}
          navigate={"Edit Profile"}
        />
        <IconButton title={"Message"} icon={message} navigate={"Message"} />
        <IconButton title={"Change Password"} icon={changePass} />
        <IconButton
          title={"Notifcation"}
          icon={notification}
          navigate={"Notification"}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.logoutView} onPress={logOutHandler}>
            <Text style={styles.logout}>Log Out</Text>
            <Icon icon={logout} xl />
          </TouchableOpacity>
        </View>

        <Space height={400} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logout: {
    color: Color.danger1,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "sofia-medium",
    lineHeight: 26,
    marginRight: 10,
  },
  logoutView: {
    padding: 10,
    backgroundColor: Color.danger2,
    marginVertical: 30,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
