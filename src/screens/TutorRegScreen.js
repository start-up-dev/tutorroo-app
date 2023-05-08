import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";
import { useState } from "react";
import Icon from "../components/common/Icon";
import LevelPrice from "../components/Auth/LevelPrice";

const emailIcon = require("../../assets/images/email.png");
const lockIcon = require("../../assets/images/lock.png");
const profileIcon = require("../../assets/images/profile-circle.png");
const locationIcon = require("../../assets/images/location.png");
const callIcon = require("../../assets/images/call-calling.png");
const eirIcon = require("../../assets/images/zip-code.png");
const teacherIcon = require("../../assets/images/teacher.png");
const mq = require("../../assets/images/mq.png");
const bookIcon = require("../../assets/images/book.png");
const tickIcon = require("../../assets/images/tick-square.png");
const tickIconActive = require("../../assets/images/tick-square-active.png");
const closeIcon = require("../../assets/images/close-circle.png");

const TutorRegScreen = () => {
  const [tab, setTab] = useState(1);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title="Tutor Registration"
          subtitle="Provide the valid info to complete registration."
        />
        {tab === 1 && (
          <>
            <Space height={30} />
            <Input placeholder="Frist Name" iconName={profileIcon} />
            <Input placeholder="Last Name" iconName={profileIcon} />
            <Input placeholder="Email" iconName={emailIcon} />
            <Input placeholder="Password" iconName={lockIcon} password />
            <Input
              placeholder="Confirm Password"
              iconName={lockIcon}
              password
            />
            <Button title="Next" onPress={() => setTab(2)} />
            <ThirdPartyAuth
              text="You agree to our Terms, Conditions and"
              linkText="Privacy Policy"
              tutor
            />
          </>
        )}

        {tab === 2 && (
          <>
            <Text style={styles.subtitle}>1. Personal Details</Text>
            <Space height={10} />
            <View style={styles.progressBar}>
              <View style={styles.progressBar50}></View>
            </View>
            <Space height={25} />
            <Input placeholder="Address Line" iconName={locationIcon} />
            <Input placeholder="Phone" iconName={locationIcon} />
            <Input placeholder="Phone" iconName={callIcon} />
            <Input placeholder="EIR Code" iconName={eirIcon} />
            <Input placeholder="Highest Qualification" iconName={teacherIcon} />
            <Input placeholder="Who are you" iconName={mq} />
            <Button title="Next" onPress={() => setTab(3)} />
          </>
        )}

        {tab === 3 && (
          <>
            <Text style={styles.subtitle}>2. Subject Information</Text>
            <Space height={10} />
            <View style={styles.progressBar}>
              <View style={styles.progressBar100}></View>
            </View>
            <Space height={25} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon icon={tickIcon} l />
              <Text style={styles.freeClass}>
                The first class will be free.
              </Text>
            </View>
            <Space height={20} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Select Subject</Text>
              <Icon icon={closeIcon} l />
            </View>

            <Space height={10} />
            <Input placeholder="Math" iconName={bookIcon} />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.label, { marginRight: "50%" }]}>
                  Level
                </Text>
                <Text style={styles.label}>Price</Text>
              </View>

              <LevelPrice title={"Primary School"} />
              <LevelPrice title={"Junior Cycle"} />
              <LevelPrice title={"Senior Cycle"} />
              <LevelPrice title={"University"} />
              <LevelPrice title={"Adult/Casual"} />
            </View>
            <Space height={30} />
            <View style={{ borderTopWidth: 1, borderColor: "#E6E6E6" }}></View>
            <Space height={16} />
            <Text style={styles.addSub}>+ Add Subject</Text>

            <Button title="Done" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: Color.dark2,
    fontFamily: "sofia-semi-bold",
    lineHeight: 36,
  },
  progressBar: {
    borderWidth: 1,
    borderColor: Color.border,
  },
  progressBar50: {
    borderWidth: 1,
    borderColor: Color.primaryDeep,
    width: "50%",
  },
  progressBar100: {
    borderWidth: 1,
    borderColor: Color.primaryDeep,
    width: "100%",
  },
  freeClass: {
    fontSize: 16,
    color: Color.dark1,
    fontFamily: "sofia-regular",
    lineHeight: 16,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: Color.dark2,
    fontFamily: "sofia-medium",
    lineHeight: 16,
  },
  addSub: {
    fontSize: 16,
    color: Color.primaryDeep,
    fontFamily: "sofia-medium",
    lineHeight: 16,
    textAlign: "center",
  },
});

export default TutorRegScreen;
