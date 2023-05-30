import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//Custom Component
import { Color } from "../../const/color";

const ErrorMessage = ({ message }) => {
  return (
    message && (
      <View style={styles.messageView}>
        <Icon name="information-outline" size={20} color={Color.danger1} />
        <Text style={styles.messageText}>{message}</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  messageView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  messageText: {
    color: Color.danger1,
    fontSize: 14,
    marginHorizontal: 10,
    textAlign: "center",
    fontFamily: "sofia-medium",
    lineHeight: 26,
  },
});

export default ErrorMessage;
