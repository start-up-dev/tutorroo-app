import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Header from "../components/common/Header";
import BackBtn from "../components/Auth/BackBtn";
import TutorRegScreen from "../screens/TutorRegScreen";
import EnterOTPScreen from "../screens/EnterOTPScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Log In"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Log In"
        component={LogInScreen}
        options={{
          header: () => <BackBtn />,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          header: () => <BackBtn />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Tutor Reg"
        component={TutorRegScreen}
        options={{
          header: () => <BackBtn />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Enter OTP"
        component={EnterOTPScreen}
        options={{
          header: () => <BackBtn />,
          gestureEnabled: false,
        }}
      />
      {/* <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Enter OTP"
        component={EnterOTPScreen}
        options={{
          header: () => <Header backIcon notification />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="RecoverPass"
        component={RecoverPassScreen}
        options={{
          header: () => <Header backIcon notification />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Reset Password"
        component={ResetPassScreen}
        options={{
          header: () => <Header backIcon notification />,
          gestureEnabled: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
