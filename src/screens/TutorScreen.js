import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

import TutorCard from "../components/common/TutorCard";
import Loader from "../components/common/Loader";

import { Color } from "../const/color";
import { useState } from "react";
import Icon from "../components/common/Icon";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const dot = require("../../assets/images/dot.png");
const sad = require("../../assets/images/emoji-sad.png");
const arrowLeft = require("../../assets/images/arrow-left.png");

const TutorScreen = ({ route }) => {
  const [tab, setTab] = useState(1);

  //Navigation
  const navigation = useNavigation();

  const { data } = route.params;

  const handleBackBtn = () => {
    if (data.screen == "home") {
      navigation.navigate("Search");
    } else {
      navigation.goBack();
    }
  };

  console.log(".............." + data.screen);

  navigation.setOptions({
    header: () => (
      <SafeAreaView style={{ backgroundColor: Color.background }}>
        <View style={styles.tabView}>
          <TouchableOpacity onPress={handleBackBtn}>
            <Image
              source={arrowLeft}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab(1)}
            style={{ alignItems: "center" }}
          >
            <Text
              style={[
                styles.tabText,
                tab === 1 && { color: Color.primaryDeep },
              ]}
            >
              All
            </Text>
            {tab === 1 && <Icon icon={dot} xs />}
            {tab === 2 && <Icon xs />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab(2)}
            style={{ alignItems: "center" }}
          >
            <Text
              style={[
                styles.tabText,
                tab === 2 && { color: Color.primaryDeep },
              ]}
            >
              Pro Tutor
            </Text>
            {tab === 2 && <Icon icon={dot} xs />}
            {tab === 1 && <Icon xs />}
          </TouchableOpacity>
          <View></View>
        </View>
      </SafeAreaView>
    ),
    gestureEnabled: false,
  });

  const tutor = useSelector((state) => state.tutor.tutor);
  const status = useSelector((state) => state.tutor.status);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Loader visible={status == "loading" ? true : false} />
        {tutor?.data?.length > 0
          ? status !== "loading" &&
            tutor.data.map((item, idx) => <TutorCard data={item} key={idx} />)
          : status !== "loading" && (
              <View style={styles.notFound}>
                <Icon icon={sad} xxl />
                <Text style={styles.notFoundText}>No Tutor Found</Text>
              </View>
            )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 16,
  },
  tabText: {
    fontFamily: "sofia-medium",
    fontSize: 16,
    lineHeight: 26,
    color: Color.dark3,
  },
  notFound: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontFamily: "sofia-medium",
    fontSize: 16,
    lineHeight: 26,
    color: Color.dark3,
    marginTop: 20,
  },
});

export default TutorScreen;
