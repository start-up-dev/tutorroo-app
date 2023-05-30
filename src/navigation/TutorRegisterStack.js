import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TutorAddDetailsScreen from "../screens/TutorAddDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/common/Header";
import EditProfileScreen from "../screens/EditProfileScreen";
import BackBtn from "../components/Auth/BackBtn";
import AuthStack from "./AuthStack";
import MainStack from ".";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const TutorRegisterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tutor Add Details"
        component={TutorAddDetailsScreen}
        options={{
          header: () => <Header home loggedIn={true} />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          header: () => <BackBtn />,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <Header home loggedIn={true} /> }}
      />
    </Stack.Navigator>
  );
};

export default TutorRegisterStack;
