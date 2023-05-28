import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Auth/Header";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";

import { useSelector, useDispatch } from "react-redux";
import {
  getMe,
  login,
  loginWithApple,
  loginWithGoogleBearerToken,
  resendOTP,
} from "../api/auth";
import ErrorMessage from "../components/common/ErrorMessage";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { clearError } from "../store/authSlice";

const emailIcon = require("../../assets/images/email.png");
const lockIcon = require("../../assets/images/lock.png");

WebBrowser.maybeCompleteAuthSession();

const LogInScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "696720031553-3etrgp4huno66euudh7srk0jf53eo4b7.apps.googleusercontent.com",
    iosClientId:
      "696720031553-4t35le1rrlqnq9n5k2vnrc4umdoollq0.apps.googleusercontent.com",
    expoClientId:
      "696720031553-tfmsicb7up7q394bit19l0ijpldq55bh.apps.googleusercontent.com",
  });

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [invalid, setInvalid] = useState();
  const [apiError, setApiError] = useState();
  const [appleToken, setAppleToken] = useState("");

  //Navigation
  const navigation = useNavigation();

  //Dispatch
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);

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

  const appleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      setAppleToken(credential.identityToken);
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  useEffect(() => {
    if (!!appleToken) {
      const body = { identityToken: appleToken };
      dispatch(loginWithApple(body));
    }
  }, [appleToken]);

  useEffect(() => {
    if (res?.access_token || res?.token) {
      navigation.navigate("Home");
      dispatch(getMe());
    }
  }, [res]);

  useEffect(() => {
    if (error?.message == "Please verify your email") {
      dispatch(clearError());
      navigation.navigate("Enter OTP", {
        data: { email: inputs.email, password: inputs.password },
      });
      dispatch(resendOTP({ email: inputs.email }));
    }
  }, [error]);

  useEffect(() => {
    if (response?.type === "success") {
      dispatch(loginWithGoogleBearerToken(response.authentication.accessToken));
    }
  }, [response]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={50} />
        <Header title={"Log In"} subtitle={"Don't have an account?"} button />
        <Space height={30} />
        <Input
          placeholder="Email"
          iconName={emailIcon}
          onChangeText={(text) => handleOnchange(text, "email")}
        />
        <Input
          placeholder="Password"
          iconName={lockIcon}
          onChangeText={(text) => handleOnchange(text, "password")}
          password
        />

        <ErrorMessage message={invalid} />

        {error?.message && apiError && (
          <ErrorMessage message={error?.message} />
        )}

        <Space height={10} />

        <Text style={styles.forgotPass}>Forgot Password?</Text>

        <Button title={"Log In"} onPress={onLogIn} status={status} />

        <ThirdPartyAuth
          googleAuth={() => {
            promptAsync();
          }}
          text="Don't have an account?"
          linkText="Register"
          link="Register"
          appleAuth={() => appleLogin()}
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
    fontSize: 16,
    textAlign: "right",
    fontFamily: "sofia-semi-bold",
  },
  //   remember: {
  //     color: Color.dark4,
  //     fontSize: 16,
  //     marginLeft: 10,
  //   },
});

export default LogInScreen;
