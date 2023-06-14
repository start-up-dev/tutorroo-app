import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../const/color";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchTutor } from "../../api/tutor";
import { selectSubject } from "../../store/tutorSlice";

const image = require("../../../assets/physics.jpeg");

const { width, height } = Dimensions.get("window");

const Subject = ({ data }) => {
  //Navigation
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onSubject = () => {
    const body = {
      subject: data?.name,
    };

    dispatch(searchTutor(body));
    dispatch(selectSubject(data?.name));
    navigation.navigate("Tutor", {
      data: { screen: "home" },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onSubject}>
      <Image
        source={data?.image ? { uri: data?.image } : image}
        style={[
          StyleSheet.absoluteFill,
          { width: "100%", height: "100%", borderRadius: 12 },
        ]}
      />
      <View
        style={{
          backgroundColor: "black",
          opacity: 0.3,
          width: "100%",
          height: "100%",
          borderRadius: 12,
        }}
      ></View>
      <Text style={styles.text}>{data?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 4,
    height: width / 4,
    borderRadius: 40,
    margin: 6,
  },
  text: {
    textAlign: "center",
    color: Color.secondaryDeep,
    position: "relative",
    bottom: 40,
    fontWeight: 500,
    fontSize: 16,
  },
});

export default Subject;
