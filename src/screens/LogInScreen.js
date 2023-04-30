import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { initializeApp } from "firebase/app";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import Header from "../components/Auth/Header";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../api/auth";
import ErrorMessage from "../components/common/ErrorMessage";
import { firebaseConfig } from "../config/firebase";

// Client ID - 696720031553-tfmsicb7up7q394bit19l0ijpldq55bh.apps.googleusercontent.com
// Client Secret - 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

// ios - 696720031553-4t35le1rrlqnq9n5k2vnrc4umdoollq0.apps.googleusercontent.com
//android - 696720031553-3etrgp4huno66euudh7srk0jf53eo4b7.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

const LogInScreen = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [invalid, setInvalid] = useState();
  const [apiError, setApiError] = useState();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "696720031553-tfmsicb7up7q394bit19l0ijpldq55bh.apps.googleusercontent.com",
    iosClientId:
      "696720031553-4t35le1rrlqnq9n5k2vnrc4umdoollq0.apps.googleusercontent.com",
    androidClientId:
      "696720031553-3etrgp4huno66euudh7srk0jf53eo4b7.apps.googleusercontent.com",
  });

  //Navigation
  const navigation = useNavigation();

  //Dispatch
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
  }

  const onLogIn = () => {
    if (validateEmail(inputs.email) && validatePassword(inputs.password)) {
      const body = {
        email: inputs.email,
        password: inputs.password,
      };
      dispatch(login(body));
      setApiError(true);
      setInvalid("");
    } else {
      setApiError(false);
      if (!validateEmail(inputs.email)) {
        setInvalid("Please provide a valid email address");
      }
      if (!validatePassword(inputs.password)) {
        setInvalid("Please provide a valid password");
      }
    }
    console.log(
      "Email:" + inputs.email + " Password:" + inputs.password + invalid
    );
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response, accessToken]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (res?.message === "Login Successful") {
      navigation.navigate("Home");
    }
  }, [res]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={50} />
        <Header title={"Log In"} subtitle={"Don't have an account?"} button />
        <Space height={30} />
        <Input
          placeholder="Email"
          iconName="envelope"
          onChangeText={(text) => handleOnchange(text, "email")}
        />
        <Input
          placeholder="Password"
          iconName="lock"
          onChangeText={(text) => handleOnchange(text, "password")}
          password
        />

        <ErrorMessage message={invalid} />

        {error?.message && apiError && <ErrorMessage message={error.message} />}

        <Space height={10} />

        <Text style={styles.forgotPass}>Forgot Password?</Text>

        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesomeIcon icon="fa-regular fa-square-check" />
            <Text style={styles.remember}>Remember Me</Text>
          </View>
        </View> */}

        <Button title={"Log In"} onPress={onLogIn} status={status} />

        <ThirdPartyAuth
          text="Don't have an account?"
          linkText="Register"
          link="Register"
          googleAuth={promtAsync}
        />

        <Button
          title={"Register as a Tutor"}
          tutor
          onPress={() => navigation.navigate("Tutor Reg")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPass: {
    color: Color.primaryDeep,
    fontWeight: 600,
    fontSize: 16,
    textAlign: "right",
  },
  //   remember: {
  //     color: Color.dark4,
  //     fontSize: 16,
  //     marginLeft: 10,
  //   },
});

export default LogInScreen;
