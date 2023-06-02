import React from "react";
import { Image, Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Color } from "../../const/color";
import { useNavigation } from "@react-navigation/native";

const logo = require("../../../assets/logo.png");
const profile = require("../../../assets/profile.jpeg");

const arrowLeft = require("../../../assets/images/arrow-left.png");
const bell = require("../../../assets/images/bell.png");

const login = require("../../../assets/images/login.png");

const Header = ({ home, title, loggedIn, inbox }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {home && (
        <View style={styles.component}>
          <Image source={logo} />
          {loggedIn ? (
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("Profile")}>
              <Image source={profile} style={styles.profileImg} />
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  lineHeight: 18,
                  fontFamily: "sofia-medium",
                }}
              >
                Log In
              </Text>
              <TouchableOpacity style={styles.loginIcon} onPress={() => navigation.navigate("Auth")}>
                <Image source={login} style={{ width: 14, height: 14, resizeMode: "contain" }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {!home && (
        <View style={styles.component}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowLeft} style={{ width: 24, height: 24, resizeMode: "contain" }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "sofia-medium",
              lineHeight: 26,
            }}
          >
            {title}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Image source={bell} style={{ width: 24, height: 24, resizeMode: "contain" }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
  },
  component: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  loginIcon: {
    backgroundColor: Color.secondaryDeep,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
});

export default Header;
