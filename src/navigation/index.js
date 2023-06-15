import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabNav";
import AuthStack from "./AuthStack";
import TutorDetailScreen from "../screens/TutorDetailScreen";
import ChatScreen from "../screens/ChatScreen";
import TutorScreen from "../screens/TutorScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Header from "../components/common/Header";
import BackBtn from "../components/Auth/BackBtn";
import EditProfileScreen from "../screens/EditProfileScreen";
import PostQuestionScreen from "../screens/PostQuestionScreen";
import TutorAddDetailsScreen from "../screens/TutorAddDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ViewAllSubjectScreen from "../screens/ViewAllSubjectScreen";
import ChangePassScreen from "../screens/ChangePassScreen";
import ResetPassScreen from "../screens/ResetPassScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
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
          header: () => <Header title="Inbox" />,
        }}
      />
      <Stack.Screen
        name="Tutor"
        component={TutorScreen}
        // options={{
        //   headerShown: false,
        // }}
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
      <Stack.Screen
        name="Tutor Add Details"
        component={TutorAddDetailsScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="View All Subject"
        component={ViewAllSubjectScreen}
        options={{
          header: () => <Header title="All Subject" />,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassScreen}
        options={{
          header: () => <BackBtn />,
        }}
      />
      <Stack.Screen
        name="Reset Password"
        component={ResetPassScreen}
        options={{
          header: () => <BackBtn />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
