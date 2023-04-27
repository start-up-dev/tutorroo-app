import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

//Color
import { Color } from "../../const/color";

const IconButton = ({ icon, color, title, deleted, navigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigate)}
      style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}
    >
      <FontAwesomeIcon icon={icon} style={{ color: color }} />
      <Text
        style={{
          color: Color.dark2,
          fontSize: 16,
          marginLeft: 10,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
