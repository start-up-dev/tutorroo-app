import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Color } from "../../const/color";
import SubjectTag from "./SubjectTag";

const cover = require("../../../assets/physics.jpeg");
const profile = require("../../../assets/profile.jpeg");

const Header = () => {
  // Image Picker
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  return (
    <View style={{ backgroundColor: Color.background }}>
      <View style={{ height: "50%" }}>
        <Image
          source={coverImage ? { uri: coverImage } : cover}
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
          <TouchableOpacity>
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Profile</Text>
          <View></View>
        </View>
        <TouchableOpacity style={styles.coverBtn} onPress={pickCoverImage}>
          <FontAwesomeIcon
            icon="fa-solid fa-camera"
            style={{ color: Color.info }}
          />
        </TouchableOpacity>

        <View style={styles.profileImgView}>
          <Image
            source={profileImage ? { uri: profileImage } : profile}
            style={styles.profileImg}
          />
          <TouchableOpacity style={styles.profileBtn} onPress={pickCoverImage}>
            <FontAwesomeIcon
              icon="fa-solid fa-camera"
              style={{ color: Color.info }}
            />
          </TouchableOpacity>

          <Text style={styles.profileName}>Mahbub Rahman</Text>
          <View style={styles.tagView}>
            <SubjectTag />
            <SubjectTag />
            <SubjectTag />
          </View>
        </View>
      </View>
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
    width: 40,
    height: 40,
    padding: 10,
    alignItems: "center",
    alignSelf: "flex-end",
    top: -70,
    left: -20,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Color.secondaryDeep,
  },
  profileBtn: {
    backgroundColor: Color.secondaryDeep,
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 7,
    position: "relative",
    alignItems: "center",
    bottom: 40,
    left: 40,
  },

  profileImgView: {
    bottom: 150,
    alignItems: "center",
  },
  profileName: {
    fontWeight: 700,
    fontSize: 18,
  },
  tagView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    alignContent: "center",
    marginTop: 10,
  },
});

export default Header;
