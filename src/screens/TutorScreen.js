import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import TutorCard from "../components/common/TutorCard";
import Loader from "../components/common/Loader";

import { Color } from "../const/color";
import { useState } from "react";
import Icon from "../components/common/Icon";
import { useSelector } from "react-redux";

const dot = require("../../assets/images/dot.png");
const sad = require("../../assets/images/emoji-sad.png");

const TutorScreen = () => {
  const [tab, setTab] = useState(1);

  const res = useSelector((state) => state.tutor.res);
  const status = useSelector((state) => state.tutor.status);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <View style={styles.tabView}>
        <View></View>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={{ alignItems: "center" }}
        >
          <Text
            style={[styles.tabText, tab === 1 && { color: Color.primaryDeep }]}
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
            style={[styles.tabText, tab === 2 && { color: Color.primaryDeep }]}
          >
            Pro Tutor
          </Text>
          {tab === 2 && <Icon icon={dot} xs />}
          {tab === 1 && <Icon xs />}
        </TouchableOpacity>
        <View></View>
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Loader visible={status == "loading" ? true : false} />
        {res?.data.length > 0
          ? status !== "loading" &&
            res.data.map((item) => <TutorCard data={item} />)
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
    justifyContent: "space-evenly",
    marginVertical: 10,
    alignItems: "center",
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
