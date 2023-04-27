import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Profile/Header";
import { Color } from "../const/color";
import IconButton from "../components/Profile/IconButton";
import Space from "../components/common/Space";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ProfileScreen = () => {
  return (
    <>
      <Header />
      <View
        style={{ backgroundColor: Color.background, paddingHorizontal: 20 }}
      >
        <IconButton
          title={"Edit Profile"}
          icon="fa-solid fa-user-pen"
          color={Color.info}
        />
        <IconButton
          title={"Message"}
          icon="fa-solid fa-message"
          color={Color.success}
        />
        <IconButton title={"Change Password"} icon="fa-solid fa-user-pen" />
        <IconButton
          title={"Notifcation"}
          icon="fa-solid fa-bell"
          color={Color.warning}
        />
        <TouchableOpacity style={styles.logoutView}>
          <Text style={styles.logout}>Log Out</Text>
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right-from-bracket"
            style={{ color: Color.danger1 }}
          />
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
