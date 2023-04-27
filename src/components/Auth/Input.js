import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "../../const/color";

const Input = ({
  iconName,
  error,
  password,
  onFocus = () => {},
  value,
  ...props
}) => {
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
        {iconName && (
          <FontAwesomeIcon
            icon={`fa-solid fa-${iconName}`}
            style={{ color: error ? Color.danger1 : Color.dark3 }}
          />
        )}
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
            <FontAwesomeIcon
              icon={`fa-regular fa-${hidePassword ? "eye" : "eye-slash"}`}
            />
          </TouchableOpacity>
          //   <Icon
          //     onPress={() => setHidePassword(!hidePassword)}
          //     name={hidePassword ? "eye-off-outline" : "eye-outline"}
          //     style={{ color: Color.primaryDeep, fontSize: 22 }}
          //   />
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
