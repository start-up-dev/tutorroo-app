import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Color } from "../../const/color";

const Button = ({ status, tutor, title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        tutor && {
          backgroundColor: Color.secondaryDeep,
          borderColor: Color.primaryDeep,
          borderWidth: 1,
        },
      ]}
    >
      {status == "loading" ? (
        <ActivityIndicator size="small" color={Color.secondaryDeep} />
      ) : (
        <Text
          style={[
            styles.title,
            tutor && {
              color: Color.primaryDeep,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    marginVertical: 30,
    width: "100%",
    backgroundColor: Color.primaryDeep,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  title: {
    color: Color.secondaryDeep,
    fontWeight: 500,
    fontSize: 16,
    fontFamily: "sofia-medium",
  },
  miniTitle: {
    color: Color.secondaryDeep,
    fontSize: 16,
  },
  miniContainer: {
    height: 35,
    width: "100%",
    backgroundColor: Color.primaryDeep,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});

export default Button;
