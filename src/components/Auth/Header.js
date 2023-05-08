import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Custom Components
import { Color } from "../../const/color";

const Header = ({ title, subtitle, button }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle}{" "}
        {button && (
          <Text
            style={styles.btn}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.dark1,
    fontFamily: "sofia-bold",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 36,
  },
  subtitle: {
    color: Color.dark2,
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "sofia-regular",
    lineHeight: 26,
  },
  btn: {
    color: Color.primaryDeep,
    textDecorationLine: "underline",
    fontWeight: 700,
  },
});

export default Header;
