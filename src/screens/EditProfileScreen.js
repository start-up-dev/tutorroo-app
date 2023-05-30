import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Auth/Input";
import ErrorMessage from "../components/common/ErrorMessage";
import Header from "../components/Auth/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Space from "../components/common/Space";
import Button from "../components/common/Button";
import { Color } from "../const/color";
import { updateProfile } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import { clearRes } from "../store/authSlice";
import * as ImagePicker from "expo-image-picker";
import Icon from "../components/common/Icon";

const profileIcon = require("../../assets/images/profile-circle.png");
const camera = require("../../assets/images/camera.png");
const cover = require("../../assets/physics.jpeg");
const profile = require("../../assets/profile.jpeg");

const EditProfileScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const res = useSelector((state) => state.auth.res);
  const userInfo = useSelector((state) => state.auth.user);

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

  const onUpdate = () => {
    const body = {
      firstName: inputs.firstName ? inputs.firstName : userInfo?.firstName,
      lastName: inputs.lastName ? inputs.lastName : userInfo?.lastName,
    };

    dispatch(updateProfile(body));
  };

  useEffect(() => {
    if (res === "Profile updated successfully") {
      dispatch(clearRes());
      navigation.goBack();
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Header
          title={"Update profile"}
          subtitle={"Update your profile by changing the info bellow"}
        />

        <View
          style={{
            height: 100,
          }}
        >
          <View>
            <Image
              source={coverImage ? { uri: coverImage } : cover}
              style={[
                {
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 10,
                },
              ]}
            />

            <TouchableOpacity style={styles.coverBtn} onPress={pickCoverImage}>
              <Icon icon={camera} l />
            </TouchableOpacity>
          </View>

          <View style={[styles.profileImgView]}>
            <Image
              source={profileImage ? { uri: profileImage } : profile}
              style={[styles.profileImg]}
            />
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={pickCoverImage}
            >
              <Icon icon={camera} l />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 100 }}>
          <Input
            value={userInfo?.firstName}
            placeholder="Frist Name"
            iconName={profileIcon}
            onChangeText={(text) => handleOnchange(text, "firstName")}
          />
          <Input
            value={userInfo?.lastName}
            placeholder="Last Name"
            iconName={profileIcon}
            onChangeText={(text) => handleOnchange(text, "lastName")}
          />
        </View>

        {error?.message && apiError && <ErrorMessage message={error.message} />}

        <Space height={10} />

        <Button title={"Update"} onPress={onUpdate} status={status} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverBtn: {
    backgroundColor: Color.secondaryDeep,
    borderRadius: 100,
    width: 26,
    height: 26,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    left: 20,
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
    bottom: 80,
  },
});

export default EditProfileScreen;
