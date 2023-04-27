import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//Component
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/common/Header";
import { Color } from "../const/color";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import FavouriteScreen from "../screens/FavouriteScreen";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconColor;

          switch (route.name) {
            case "Home":
              iconName = "fa-solid fa-house";
              iconColor = focused ? Color.primaryDeep : Color.dark3;
              break;
            case "Search":
              iconName = "fa-solid fa-magnifying-glass";
              iconColor = focused ? Color.primaryDeep : Color.dark3;
              break;
            case "Profile":
              iconName = "fa-regular fa-user";
              iconColor = focused ? Color.primaryDeep : Color.dark3;
              break;
            case "Message":
              iconName = "fa-regular fa-message";
              iconColor = focused ? Color.primaryDeep : Color.dark3;
              break;
            case "Favourite":
              iconName = "fa-regular fa-heart";
              iconColor = focused ? Color.primaryDeep : Color.dark3;
              break;
          }

          return (
            <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <Header home /> }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ header: () => <Header title="Find A Tutor" /> }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{ header: () => <Header title="Messages" /> }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{ header: () => <Header title="Favourite" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
