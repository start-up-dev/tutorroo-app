import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../../const/color";
import Icon from "../common/Icon";

const eyeIcon = require("../../../assets/images/eye.png");
const hideEyeIcon = require("../../../assets/images/eye-slash.png");

const Input = ({ iconName, error, password, onFocus = () => {}, value, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? Color.danger1 : Color.border,
            alignItems: "center",
          },
        ]}
      >
        <Icon icon={iconName} xl />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          defaultValue={value}
          secureTextEntry={hidePassword}
          style={{
            color: Color.dark1,
            fontSize: 16,
            flex: 1,
            marginLeft: 15,
          }}
          {...props}
          placeholderTextColor={Color.dark3}
        />
        {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon icon={hidePassword ? eyeIcon : hideEyeIcon} l />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default Input;
