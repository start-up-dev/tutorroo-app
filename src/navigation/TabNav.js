import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//Component
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/common/Header";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { Image } from "react-native";
import { useSelector } from "react-redux";

//icon

const homeActive = require("../../assets/images/homeActive.png");
const home = require("../../assets/images/home.png");

const heart = require("../../assets/images/heart.png");
const heartActive = require("../../assets/images/heartActive.png");

const search = require("../../assets/images/search.png");
const searchActive = require("../../assets/images/searchActive.png");

const message = require("../../assets/images/message.png");
const messageActive = require("../../assets/images/messageActive.png");

const profile = require("../../assets/images/profile.png");
const profileActive = require("../../assets/images/profileActive.png");

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? homeActive : home;
              break;
            case "Search":
              iconName = focused ? searchActive : search;
              break;
            case "Profile":
              iconName = focused ? profileActive : profile;
              break;
            case "Message":
              iconName = focused ? messageActive : message;
              break;
            case "Favourite":
              iconName = focused ? heartActive : heart;
              break;
          }

          return (
            <Image
              source={iconName}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <Header home loggedIn={isLoggedIn} /> }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ header: () => <Header title="Find A Tutor" /> }}
      />
      {isLoggedIn && (
        <>
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
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNav;
