import { SafeAreaView, View } from "react-native";
import Button from "../components/common/Button";
import Space from "../components/common/Space";
import ErrorMessage from "../components/common/ErrorMessage";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import { Color } from "../const/color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changePassword } from "../api/auth";
import { clearRes } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";

const lockIcon = require("../../assets/images/lock.png");

const ChangePassScreen = () => {
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [oldPass, setOldPass] = useState();
  const [apiError, setApiError] = useState();

  const dispatch = useDispatch();

  //Navigation
  const navigation = useNavigation();

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);
  const userInfo = useSelector((state) => state.auth.user);

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
  }

  const onUpdate = () => {
    const body = {
      email: userInfo?.email,
      password: oldPass,
      new_password: newPass,
    };

    if (validatePassword(newPass) && validatePassword(oldPass)) {
      setApiError("");
      if (newPass === confirmPass) {
        setApiError("");
        dispatch(changePassword(body));
        console.log(body);
      } else {
        setApiError("Password Doesn't match");
      }
    } else {
      setApiError("Password must be strong");
    }
  };

  useEffect(() => {
    if (res == "Password changed successfully") {
      dispatch(clearRes());
      navigation.goBack();
    }
  }, [res]);
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title={"Change Password"}
          subtitle={"Please fill the current password and the new password."}
        />
        <Space height={30} />
        <Input
          placeholder="Old Password"
          iconName={lockIcon}
          onChangeText={(text) => setOldPass(text)}
          password
        />
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

        <Button title={"Update"} onPress={onUpdate} status={status} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassScreen;
