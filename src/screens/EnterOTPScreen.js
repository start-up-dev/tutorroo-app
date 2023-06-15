import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OTPTextView from "react-native-otp-textinput";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../const/color";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage";
import Header from "../components/Auth/Header";
import { getMe, login, verifyAccount } from "../api/auth";

const EnterOTPScreen = ({ route }) => {
  const [otpInput, setOtpInput] = useState();

  const { data } = route.params;

  const dispatch = useDispatch();

  //Navigation
  const navigation = useNavigation();

  // selectors
  const res = useSelector((state) => state.auth.res);
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const onPressHandler = () => {
    if (data?.navigate == "Reset Password") {
      const body = {
        sessionId: data?.sessionId,
        code: otpInput,
      };
      navigation.navigate("Reset Password", { data: body });
    }

    if (res?.session) {
      const body = {
        sessionId: res?.session?.sessionId,
        code: otpInput,
      };
      dispatch(verifyAccount(body));
    }
  };

  useEffect(() => {
    if (res == "Your email is successfully verified!") {
      const body = {
        email: data.email,
        password: data.password,
      };
      dispatch(login(body));
    }
  }, [res]);

  useEffect(() => {
    if (res?.access_token || res?.token) {
      navigation.navigate(
        res?.type == "tutor" && !res?.eirCode ? "Tutor Add Details" : "Tab Nav"
      );
      dispatch(getMe());
    }
  }, [res]);

  console.log("....." + JSON.stringify(res));

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <StatusBar />
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Header
          title={"Code Verification"}
          subtitle={"Enter one time password sent on " + data?.email}
        />

        <OTPTextView
          handleTextChange={(otp) => setOtpInput(otp)}
          inputCount={4}
          keyboardType="numeric"
          textInputStyle={styles.textInput}
          containerStyle={styles.inputContainer}
        />
        {error?.message && <ErrorMessage message={error?.message} />}

        <Button
          title="Submit"
          status={status}
          onPress={() => onPressHandler()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: Color.primaryDeep,
    fontSize: 20,
    fontFamily: "sofia-semi-bold",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: Color.grayText,
  },
  inputContainer: {
    justifyContent: "center",
    marginVertical: 30,
  },
});
export default EnterOTPScreen;
