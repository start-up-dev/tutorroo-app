import { SafeAreaView, ScrollView, Text } from "react-native";
import Input from "../components/Auth/Input";
import ErrorMessage from "../components/common/ErrorMessage";
import Header from "../components/Auth/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Space from "../components/common/Space";
import Button from "../components/common/Button";
import { Color } from "../const/color";
import { updateProfile } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import { clearRes } from "../store/authSlice";

const emailIcon = require("../../assets/images/email.png");
const profileIcon = require("../../assets/images/profile-circle.png");

const EditProfileScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);
  const userInfo = useSelector((state) => state.auth.user);

  const onUpdate = () => {
    const body = {
      firstName: inputs.firstName ? inputs.firstName : userInfo?.firstName,
      lastName: inputs.lastName ? inputs.lastName : userInfo?.lastName,
    };

    dispatch(updateProfile(body));
  };

  useEffect(() => {
    if (res === "Profile updated successfully") {
      dispatch(clearRes());
      navigation.goBack();
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Header
          title={"Update profile"}
          subtitle={"Update your profile by changing the info bellow"}
          button
        />
        <Space height={30} />
        <Input
          value={userInfo?.firstName}
          placeholder="Frist Name"
          iconName={profileIcon}
          onChangeText={(text) => handleOnchange(text, "firstName")}
        />
        <Input
          value={userInfo?.lastName}
          placeholder="Last Name"
          iconName={profileIcon}
          onChangeText={(text) => handleOnchange(text, "lastName")}
        />

        {error?.message && apiError && <ErrorMessage message={error.message} />}

        <Space height={10} />

        <Button title={"Update"} onPress={onUpdate} status={status} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
