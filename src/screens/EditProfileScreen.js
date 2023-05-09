import { SafeAreaView, ScrollView, Text } from "react-native";
import Input from "../components/Auth/Input";
import ErrorMessage from "../components/common/ErrorMessage";
import Header from "../components/Auth/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import Space from "../components/common/Space";
import Button from "../components/common/Button";
import { Color } from "../const/color";

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

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);

  const onUpdate = () => {
    const body = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    };
  };

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
          placeholder="Frist Name"
          iconName={profileIcon}
          onChangeText={(text) => handleOnchange(text, "firstName")}
        />
        <Input
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
