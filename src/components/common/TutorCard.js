import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../const/color";
import SubjectTag from "../Profile/SubjectTag";
import Space from "./Space";
import Icon from "./Icon";
import { useState } from "react";

const profile = require("../../../assets/profile.jpeg");
const verified = require("../../../assets/images/verified.png");
const star = require("../../../assets/images/star.png");
const heartActive = require("../../../assets/images/heartActive.png");
const heart = require("../../../assets/images/heart.png");

const TutorCard = ({ data }) => {
  const [favourite, setFavourite] = useState(false);

  //Navigation
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Color.secondaryDeep,
        marginVertical: 6,
        borderRadius: 12,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Tutor Detail")}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={profile} style={styles.profileImg} />
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.nameText}>
                  {data?.tutor.firstName ? data?.tutor.firstName : "Mahbub"}
                </Text>
                <Icon icon={verified} />
              </View>
              <Space height={10} />
              <SubjectTag />
              <Space height={10} />
              <Text style={styles.qualificationText}>Phd in Mathmatics</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity onPress={() => setFavourite(!favourite)}>
                <Icon icon={favourite ? heartActive : heart} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon icon={star} />
                <Text style={styles.ratingText}>4/5</Text>
              </View>
            </View>
            <Text style={styles.priceText}>€15.00/h</Text>
            <Space height={30} />
          </View>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Pharetra viverra accumsan
          neque neque faucibus sed. Utpat condimentum{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 8,
    margin: 10,
  },
  verified: {
    width: 20,
    height: 20,
  },
  nameText: {
    color: Color.dark1,
    fontSize: 16,
    fontFamily: "sofia-medium",
    lineHeight: 26,
    marginRight: 5,
  },
  priceText: {
    color: Color.dark1,
    fontSize: 18,
    fontFamily: "sofia-medium",
    lineHeight: 26,
    marginRight: 10,
    marginTop: 7,
  },
  qualificationText: {
    color: Color.dark1,
    fontSize: 14,
    fontFamily: "sofia-regular",
    lineHeight: 26,
  },
  ratingText: {
    color: "#0B0C29",
    fontSize: 14,
    fontFamily: "sofia-light",
    lineHeight: 24,
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: Color.dark3,
    marginHorizontal: 10,
    marginVertical: 5,
    lineHeight: 24,
    fontFamily: "sofia-regular",
  },
});

export default TutorCard;
