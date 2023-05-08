import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabNav";
import AuthStack from "./AuthStack";
import TutorDetailScreen from "../screens/TutorDetailScreen";
import MessageDetailScreen from "../screens/ChatScreen";
import ChatScreen from "../screens/ChatScreen";
import Header from "../components/common/Header";

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
    </Stack.Navigator>
  );
};

export default MainStack;
