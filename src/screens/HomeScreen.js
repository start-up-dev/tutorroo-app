import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Subject from "../components/Home/Subject";

const banner1 = require("../../assets/banner1.jpg");
const banner2 = require("../../assets/banner2.png");
const banner3 = require("../../assets/banner3.png");

const data = [banner3, banner3, banner3];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image source={banner1} style={styles.banner1} />
        <Space height={20} />
        <View style={{ flexDirection: "row" }}>
          <Subject />
          <Subject />
          <Subject />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Subject />
          <Subject />
          <Subject />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Subject />
          <Subject />
          <Subject />
        </View>
        <Space height={10} />
        <TouchableOpacity>
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
