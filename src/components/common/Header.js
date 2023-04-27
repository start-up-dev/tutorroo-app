import React from "react";
import {
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Color } from "../../const/color";
import { useNavigation } from "@react-navigation/native";

const logo = require("../../../assets/logo.png");

const Header = ({ home, title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {home && (
        <View style={styles.component}>
          <Image source={logo} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 10, fontSize: 16, fontWeight: 500 }}>
              Log In
            </Text>
            <TouchableOpacity
              style={styles.loginIcon}
              onPress={() => navigation.navigate("Auth")}
            >
              <FontAwesomeIcon
                style={{ color: Color.success }}
                icon="fa-solid fa-arrow-right-to-bracket"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!home && (
        <View style={styles.component}>
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{title}</Text>
          <FontAwesomeIcon icon="fa-solid fa-bell" />
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
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  loginIcon: {
    backgroundColor: Color.secondaryDeep,
    padding: 15,
    borderRadius: 100,
  },
});

export default Header;
