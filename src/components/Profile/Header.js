import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import { Color } from "../../const/color";
import SubjectTag from "./SubjectTag";
import Icon from "../common/Icon";
import Space from "../common/Space";

const cover = require("../../../assets/physics.jpeg");
const profile = require("../../../assets/profile.jpeg");
const left = require("../../../assets/images/arrow-left.png");

const Header = ({ tutorProfile, data }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: Color.background }}>
      <View style={{ height: 200, marginBottom: 100 }}>
        <Image
          source={cover}
          style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
        />
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.2,
            width: "100%",
            height: "100%",
          }}
        ></View>
        <View style={styles.navBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={left} xl />
          </TouchableOpacity>
          {!tutorProfile && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "sofia-medium",
                lineHeight: 26,
              }}
            >
              Profile
            </Text>
          )}

          <View></View>
        </View>
        <View style={[styles.profileImgView]}>
          <Image
            source={data?.avatar ? { uri: data?.avatar } : profile}
            style={[styles.profileImg]}
          />
          <Space height={20} />
          <Text style={styles.profileName}>
            {data?.firstName ? data?.firstName : "Add Name"} {data?.lastName}
          </Text>
        </View>
      </View>
      {tutorProfile && (
        <View>
          <View style={styles.tagView}>
            <SubjectTag />
            <SubjectTag />
          </View>
          <Text style={styles.freeClass}>Enjoy your first class for free.</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#E6E6E6",
              padding: 10,
            }}
          >
            <View>
              <Text style={styles.priceText}>€15.00</Text>
              <Text style={styles.priceDes}>Hourly Rate</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: "#E6E6E6" }}></View>
            <View>
              <Text style={styles.priceText}>2h</Text>
              <Text style={styles.priceDes}>Response Time</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    bottom: "35%",
    paddingHorizontal: 20,
  },
  coverBtn: {
    backgroundColor: Color.secondaryDeep,
    borderRadius: 100,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    top: -70,
    left: -20,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Color.secondaryDeep,
  },
  profileBtn: {
    backgroundColor: Color.secondaryDeep,
    borderRadius: 100,
    width: 26,
    height: 26,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    left: 40,
  },

  profileImgView: {
    alignItems: "center",
    bottom: 90,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "sofia-bold",
    lineHeight: 26,
  },
  tagView: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 12,
  },
  freeClass: {
    fontSize: 16,
    fontFamily: "sofia-regular",
    lineHeight: 16,
    color: Color.warning,
    marginVertical: 20,
    textAlign: "center",
  },
  priceText: {
    fontSize: 18,
    fontFamily: "sofia-medium",
    lineHeight: 26,
    color: Color.dark1,
    textAlign: "center",
  },
  priceDes: {
    fontSize: 13,
    fontFamily: "sofia-medium",
    lineHeight: 26,
    color: Color.dark4,
    textAlign: "center",
  },
});

export default Header;
