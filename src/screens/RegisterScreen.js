import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../api/auth";
import ErrorMessage from "../components/common/ErrorMessage";
import { clearRes } from "../store/authSlice";

const emailIcon = require("../../assets/images/email.png");
const lockIcon = require("../../assets/images/lock.png");
const profileIcon = require("../../assets/images/profile-circle.png");

const RegisterScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  const onRegister = async () => {
    // const sendEmail = await sendSignInLinkToEmail(
    //   getAuth(app),
    //   "mahbub@makereal.io",
    //   { handleCodeInApp: true }
    // );
    // console.log("Send Email:" + sendEmail);

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
        type: "student",
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

  console.log(res);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title="Student Registration"
          subtitle="Provide the valid info to complete registration."
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
        <Input
          placeholder="Confirm Password"
          iconName={lockIcon}
          onChangeText={(text) => handleOnchange(text, "confirmPassword")}
          password
        />

        <ErrorMessage message={invalid} />

        {error && apiError && <ErrorMessage message={error?.email} />}

        <Button title="Register" status={status} onPress={onRegister} />
        <ThirdPartyAuth
          text="You agree to our Terms, Conditions and"
          linkText="Privacy Policy"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
