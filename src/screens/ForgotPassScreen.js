import { SafeAreaView, View } from "react-native";
import Button from "../components/common/Button";
import Space from "../components/common/Space";
import ErrorMessage from "../components/common/ErrorMessage";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import { Color } from "../const/color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changePassword, forgotPassword } from "../api/auth";
import { clearError, clearRes } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";

const emailIcon = require("../../assets/images/email.png");

const ForgotPassScreen = () => {
  const [email, setEmail] = useState();
  const [apiError, setApiError] = useState();

  const dispatch = useDispatch();

  //Navigation
  const navigation = useNavigation();

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const verifyEmail = () => {
    const body = {
      email: email,
    };

    if (validateEmail(email)) {
      setApiError("");
      dispatch(forgotPassword(body));
    } else {
      setApiError("Please insert a valid email");
      console.log(email);
    }
  };

  useEffect(() => {
    if (res?.message == "Successfully resent verification code!") {
      navigation.navigate("Enter OTP", {
        data: {
          email: email,
          sessionId: res?.session?.sessionId,
          navigate: "Reset Password",
        },
      });
      dispatch(clearError());
      dispatch(clearRes());
    }
  }, [res]);
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title={"Forgot Password"}
          subtitle={
            "Please insert the email that you have used to create your account"
          }
        />
        <Space height={30} />
        <Input
          placeholder="Enter Email"
          iconName={emailIcon}
          onChangeText={(text) => setEmail(text)}
        />

        {apiError && <ErrorMessage message={apiError} />}
        {error?.message && <ErrorMessage message={error?.message} />}

        <Space height={10} />

        <Button title={"Verify Email"} onPress={verifyEmail} status={status} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassScreen;
