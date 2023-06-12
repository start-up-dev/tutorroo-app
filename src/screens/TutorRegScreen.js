import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { register } from "../api/auth";

const emailIcon = require("../../assets/images/email.png");
const lockIcon = require("../../assets/images/lock.png");
const profileIcon = require("../../assets/images/profile-circle.png");

const TutorRegScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [tab, setTab] = useState(1);
  const [invalid, setInvalid] = useState();
  const [apiError, setApiError] = useState();

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

  const onRegister = () => {
    if (
      validateEmail(inputs.email) &&
      validatePassword(inputs.password) &&
      inputs.password === inputs.confirmPassword
    ) {
      const body = {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        password: inputs.password,
        type: "tutor",
      };
      dispatch(register(body));
      setApiError(true);

      setInvalid("");
    } else {
      setApiError(false);
      if (inputs.password !== inputs.confirmPassword) {
        setInvalid("Password Doesn't Match");
      }
      if (!validatePassword(inputs.password)) {
        setInvalid("Please provide a strong password");
      }
      if (!validateEmail(inputs.email)) {
        setInvalid("Please provide a valid email address");
      }
    }
  };

  useEffect(() => {
    if (res?.userId) {
      navigation.navigate("Enter OTP", {
        data: { email: inputs.email, password: inputs.password },
      });
    }
  }, [res]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title="Tutor Registration"
          subtitle="Provide the valid info to complete registration."
        />
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
        <Input
          placeholder="Email"
          iconName={emailIcon}
          onChangeText={(text) => handleOnchange(text, "email")}
        />
        <Input
          placeholder="Password"
          iconName={lockIcon}
          password
          onChangeText={(text) => handleOnchange(text, "password")}
        />
        <Input
          placeholder="Confirm Password"
          iconName={lockIcon}
          password
          onChangeText={(text) => handleOnchange(text, "confirmPassword")}
        />
        <ErrorMessage message={invalid} />

        {error && apiError && <ErrorMessage message={error?.email} />}
        <Button title="Next" status={status} onPress={() => onRegister()} />
        <ThirdPartyAuth
          text="You agree to our Terms, Conditions and"
          linkText="Privacy Policy"
          tutor
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TutorRegScreen;
