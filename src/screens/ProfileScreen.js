import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Profile/Header";
import { Color } from "../const/color";
import IconButton from "../components/Profile/IconButton";
import Space from "../components/common/Space";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "../components/common/Icon";

const editProfile = require("../../assets/images/user-edit.png");
const message = require("../../assets/images/message-text.png");
const changePass = require("../../assets/images/password-check.png");
const notification = require("../../assets/images/notification-bing.png");
const logout = require("../../assets/images/logout.png");

const ProfileScreen = () => {
  return (
    <>
      <Header />
      <View
        style={{ backgroundColor: Color.background, paddingHorizontal: 20 }}
      >
        <IconButton title={"Edit Profile"} icon={editProfile} />
        <IconButton title={"Message"} icon={message} />
        <IconButton title={"Change Password"} icon={changePass} />
        <IconButton title={"Notifcation"} icon={notification} />
        <TouchableOpacity style={styles.logoutView}>
          <Text style={styles.logout}>Log Out</Text>
          <Icon icon={logout} xl />
        </TouchableOpacity>
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
    width: "30%",
    justifyContent: "center",
  },
});

export default ProfileScreen;
