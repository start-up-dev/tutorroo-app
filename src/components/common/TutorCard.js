import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../const/color";
import SubjectTag from "../Profile/SubjectTag";
import Space from "./Space";
import Icon from "./Icon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../../api/tutor";
import { getMe } from "../../api/auth";
import { wishlistRemoved } from "../../store/tutorSlice";

const profile = require("../../../assets/profile.jpeg");
const verified = require("../../../assets/images/verified.png");
const star = require("../../../assets/images/star.png");
const heartActive = require("../../../assets/images/heartActive.png");
const heart = require("../../../assets/images/heart.png");

const TutorCard = ({ data }) => {
  const [favourite, setFavourite] = useState(false);

  //Navigation
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.user);
  const selectedSubject = useSelector((state) => state.tutor.selectedSubject);

  // Find the subject
  const mathSubject = data?.subjectInfo?.find(
    (item) => item.subject === selectedSubject
  );

  // Get a random subject
  const randomSubject =
    data?.subjectInfo[Math.floor(Math.random() * data?.subjectInfo?.length)];

  // Get a random price value for the subject "Math"
  let randomPrice = null;

  if (mathSubject) {
    const levels = mathSubject.level;
    if (levels.length > 0) {
      const randomIndex = Math.floor(Math.random() * levels.length);
      randomPrice = levels[randomIndex]?.price;
    }
  } else {
    const levels = randomSubject.level;
    if (levels.length > 0) {
      const randomIndex = Math.floor(Math.random() * levels.length);
      randomPrice = levels[randomIndex]?.price;
    }
  }

  const onWishlist = (id) => {
    if (favourite) {
      setFavourite(false);
      dispatch(removeWishlist(id));
      dispatch(wishlistRemoved(id));
    } else {
      setFavourite(true);
      dispatch(addWishlist(id));
    }
  };

  useEffect(() => {
    if (userInfo?.wishlist?.includes(data?._id)) {
      setFavourite(true);
    }
  }, [userInfo]);

  return (
    <View
      style={{
        backgroundColor: Color.secondaryDeep,
        marginVertical: 6,
        borderRadius: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Tutor Detail", { data: data })}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={profile} style={styles.profileImg} />
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.nameText}>
                  {data?.tutor.firstName ? data?.tutor.firstName : "Mahbub"}
                </Text>
                {data?.tutorsChoice && <Icon icon={verified} />}
              </View>
              <Space height={10} />
              <SubjectTag
                subject={
                  selectedSubject ? selectedSubject : randomSubject?.subject
                }
              />
              <Space height={10} />
              <Text style={styles.qualificationText}>
                {data?.qualification}
              </Text>
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
              <TouchableOpacity
                onPress={() =>
                  userInfo ? onWishlist(data?._id) : navigation.navigate("Auth")
                }
              >
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
            <Text style={styles.priceText}>€ {randomPrice}/h</Text>
            <Space height={30} />
          </View>
        </View>
        <Text style={styles.description}>{data?.description}</Text>
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
