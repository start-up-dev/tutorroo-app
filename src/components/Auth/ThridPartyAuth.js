import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Custom Components

import { Color } from "../../const/color";
import Space from "../common/Space";

// Custom Assets

const google = require("../../../assets/images/google.png");
const apple = require("../../../assets/images/apple.png");
const facebook = require("../../../assets/images/facebook.png");

const ThirdPartyAuth = ({
  text,
  link,
  linkText,
  tutor,
  googleAuth = () => {},
  appleAuth = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <View>
      {!tutor && (
        <>
          <Text style={styles.continueWith}>Or continue with</Text>
          <View style={styles.continueView}>
            <TouchableOpacity style={styles.continueBox} onPress={googleAuth}>
              <Image source={google} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

            {Platform.OS === "ios" && (
              <TouchableOpacity style={styles.continueBox} onPress={appleAuth}>
                <Image source={apple} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <Space height={20} />
      <TouchableOpacity>
        <Text style={styles.bottomText}>
          {text + " "}
          <Text
            style={styles.registerBtn}
            onPress={() => navigation.navigate(link)}
          >
            {linkText}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continueWith: {
    color: Color.dark4,
    textAlign: "center",
    fontSize: 16,
  },
  continueView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  continueBox: {
    height: 50,
    width: "30%",
    backgroundColor: Color.border,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 10,
  },

  bottomText: {
    color: Color.dark2,
    fontSize: 14,
    textAlign: "center",
  },

  registerBtn: {
    color: Color.primaryDeep,
    fontWeight: 600,
    textDecorationLine: "underline",
  },
});

export default ThirdPartyAuth;
