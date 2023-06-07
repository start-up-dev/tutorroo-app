import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../const/color";
import Space from "../components/common/Space";
import Subject from "../components/Home/Subject";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../api/tutor";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { saveExpoPushToken } from "../api/notifications";

const banner1 = require("../../assets/banner1.jpg");
const banner2 = require("../../assets/banner2.png");
const banner3 = require("../../assets/banner3.png");

const data = [banner3, banner3, banner3];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  return token;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const subject = useSelector((state) => state.tutor.subject);

  const firstNine = subject?.slice(0, 9);

  useEffect(() => {
    if (subject === null) {
      dispatch(getSubject());
    }

    registerForPushNotificationsAsync().then(saveExpoPushToken);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Search")}>
          <Image source={banner1} style={styles.banner1} />
        </Pressable>
        <Space height={20} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {firstNine?.length > 0 &&
            firstNine?.map((item) => <Subject key={item._id} data={item} />)}
        </View>
        <Space height={10} />
        <TouchableOpacity
          onPress={() => navigation.navigate("View All Subject")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
        <Space height={20} />
        <Image source={banner2} style={styles.banner2} />
        <Space height={20} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                source={item}
                style={{
                  width: width - 50,
                  borderRadius: 4,
                  margin: 5,
                  height: 130,
                }}
              />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
        />
        <Space height={30} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  banner1: {
    width: width - 40,
    height: 150,
    borderRadius: 12,
  },
  banner2: {
    width: width - 40,
    height: 70,
    borderRadius: 12,
  },
  viewAll: {
    color: Color.dark3,
    textDecorationLine: "underline",
    textAlign: "center",
    fontFamily: "sofia-medium",
  },
});

export default HomeScreen;
