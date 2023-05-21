import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabNav";
import AuthStack from "./AuthStack";
import TutorDetailScreen from "../screens/TutorDetailScreen";
import MessageDetailScreen from "../screens/ChatScreen";
import ChatScreen from "../screens/ChatScreen";
import TutorScreen from "../screens/TutorScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Header from "../components/common/Header";
import BackBtn from "../components/Auth/BackBtn";
import EditProfileScreen from "../screens/EditProfileScreen";
import PostQuestionScreen from "../screens/PostQuestionScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab Nav"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Tab Nav"
        component={TabNav}
        options={{
          headerShown: false,
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
        name="Tutor Detail"
        component={TutorDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: () => <Header title="Isfat Sharik" />,
        }}
      />
      <Stack.Screen
        name="Tutor"
        component={TutorScreen}
        options={{
          header: () => <Header title="Tutor" />,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          header: () => <Header title="Notification" />,
        }}
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
        name="Post Question"
        component={PostQuestionScreen}
        options={{
          header: () => <Header title="Post A Question" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
