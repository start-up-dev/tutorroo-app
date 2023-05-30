import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
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
    </Stack.Navigator>
  );
};

export default AuthStack;
