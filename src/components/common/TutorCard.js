import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { Color } from "../../const/color";
import SubjectTag from "../Profile/SubjectTag";
import Space from "./Space";

const profile = require("../../../assets/profile.jpeg");
const verified = require("../../../assets/verified.png");

const TutorCard = () => {
  return (
    <View style={{ backgroundColor: Color.secondaryDeep, marginVertical: 6 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={profile} style={styles.profileImg} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontWeight: 500, marginRight: 5 }}>
                Isfat
              </Text>
              <Image source={verified} style={styles.verified} />
            </View>
            <Space height={10} />
            <SubjectTag />
            <Space height={10} />
            <Text>Phd in Mathmatics</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon="fa-regular fa-heart"
                style={{ color: Color.dark4 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignItems: "center",
                marginHorizontal: 10,
                color: Color.dark2,
                fontSize: 14,
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                style={{ color: Color.warning }}
              />{" "}
              4/5
            </Text>
          </View>
          <Text style={{ color: Color.dark1, fontSize: 18, marginTop: 10 }}>
            €15.00/h
          </Text>
          <Space height={30} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: Color.dark3,
          marginHorizontal: 10,
          marginVertical: 5,
          lineHeight: 24,
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Pharetra viverra accumsan neque
        neque faucibus sed. Utpat condimentum{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
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
});

export default TutorCard;
