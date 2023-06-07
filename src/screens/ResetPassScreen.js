import { SafeAreaView, View } from "react-native";
import Button from "../components/common/Button";
import Space from "../components/common/Space";
import ErrorMessage from "../components/common/ErrorMessage";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import { Color } from "../const/color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changePassword, login, resetPassword } from "../api/auth";
import { clearRes } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";

const lockIcon = require("../../assets/images/lock.png");

const ResetPassScreen = ({ route }) => {
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [apiError, setApiError] = useState();

  const dispatch = useDispatch();

  const { data } = route.params;

  //Navigation
  const navigation = useNavigation();

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
  }

  const onReset = () => {
    const body = {
      sessionId: data?.sessionId,
      code: data?.code,
      newPassword: newPass,
    };

    if (validatePassword(newPass)) {
      setApiError("");
      if (newPass === confirmPass) {
        setApiError("");
        dispatch(resetPassword(body));
        console.log(body);
      } else {
        setApiError("Password Doesn't match");
      }
    } else {
      setApiError("Password must be strong");
    }
  };

  useEffect(() => {
    if (res == "Your password is successfully reset!") {
      dispatch(clearRes());
      navigation.navigate("Log In");
    }
  }, [res]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title={"Reset Password"}
          subtitle={"Please insert the new password."}
        />
        <Space height={30} />
        <Input
          placeholder="New Password"
          iconName={lockIcon}
          onChangeText={(text) => setNewPass(text)}
          password
        />
        <Input
          placeholder="Confirm New Password"
          iconName={lockIcon}
          onChangeText={(text) => setConfirmPass(text)}
          password
        />

        {apiError && <ErrorMessage message={apiError} />}
        {error?.message && <ErrorMessage message={error?.message} />}

        <Space height={10} />

        <Button title={"Reset Password"} onPress={onReset} status={status} />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassScreen;
