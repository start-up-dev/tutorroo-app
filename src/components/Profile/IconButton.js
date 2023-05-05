import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Color
import { Color } from "../../const/color";
import Icon from "../common/Icon";

const IconButton = ({ icon, color, title, deleted, navigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigate)}
      style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
    >
      <Icon icon={icon} xl />
      <Text
        style={{
          color: Color.dark2,
          fontSize: 16,
          marginLeft: 10,
          fontFamily: "sofia-medium",
          lineHeight: 26,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
