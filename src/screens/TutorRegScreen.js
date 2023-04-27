import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Input from "../components/Auth/Input";
import Header from "../components/Auth/Header";
import Button from "../components/common/Button";
import ThirdPartyAuth from "../components/Auth/ThridPartyAuth";
import { useState } from "react";

const TutorRegScreen = () => {
  const [personalDetails, setPersonalDetails] = useState();
  const [subjectInfo, setSubjectInfo] = useState();
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
            <Input placeholder="Frist Name" iconName="circle-user" />
            <Input placeholder="Last Name" iconName="circle-user" />
            <Input placeholder="Email" iconName="envelope" />
            <Input placeholder="Password" iconName="lock" password />
            <Input placeholder="Confirm Password" iconName="lock" password />
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
            <Input placeholder="Address Line" iconName="circle-user" />
            <Input placeholder="Phone" iconName="circle-user" />
            <Input placeholder="EIR Code" iconName="envelope" />
            <Input placeholder="Highest Qualification" iconName="envelope" />
            <Input placeholder="Who are you" iconName="envelope" />
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
            <Input placeholder="Address Line" iconName="circle-user" />
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
    fontWeight: 600,
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
});

export default TutorRegScreen;
