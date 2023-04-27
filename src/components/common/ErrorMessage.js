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
  },
  messageText: {
    color: Color.danger1,
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 2,
    fontWeight: 500,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default ErrorMessage;
