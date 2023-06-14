import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Profile/Header";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Icon from "../components/common/Icon";
import Button from "../components/common/Button";
import { sendMessageRequest } from "../api/inbox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInboxes } from "../store/inboxSlice";

const teacher = require("../../assets/images/teacher.png");

const TutorDetailScreen = ({ route }) => {
  const { data } = route.params;

  const [isLoading, setLoading] = useState(false);

  const selectedSubject = useSelector((state) => state.tutor.selectedSubject);
  const user = useSelector((state) => state.auth.user);

  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get a random subject
  const randomSubject =
    data?.subjectInfo[Math.floor(Math.random() * data?.subjectInfo?.length)];

  const selectedSubjectInfo = data.subjectInfo.find(
    (item) =>
      item.subject ===
      (selectedSubject ? selectedSubject : randomSubject?.subject)
  );

  const _sendMessageRequest = async () => {
    try {
      setLoading(true);
      const inbox = await sendMessageRequest(data?.tutor._id);
      setLoading(false);
      dispatch(addInboxes([inbox]));
      navigation.navigate("Chat", { inbox });
    } catch (error) {
      setLoading(false);

      alert(error?.response?.data?.issue?.message || error?.message);
    }
  };
  return (
    <>
      <Header tutorProfile data={data?.tutor} allData={data} />

      <SafeAreaView
        style={{
          backgroundColor: Color.background,
          flex: 1,
        }}
      >
        <ScrollView>
          <View>
            {selectedSubjectInfo.level?.map((item, idx) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#E6E6E6",
                  padding: 10,
                }}
              >
                <View style={{ width: "35%" }}>
                  <Text style={styles.priceText}>{item.name}</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#E6E6E6" }}></View>
                <View>
                  <Text style={styles.priceText}>€ {item.price}/hour</Text>
                </View>
              </View>
            ))}

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                borderBottomWidth: 1,
                borderColor: "#E6E6E6",
                padding: 10,
              }}
            >
              <View style={{ width: "25%" }}>
                <Text style={styles.priceText}>University</Text>
                <Text style={styles.priceDes}>Hourly Rate</Text>
              </View>
              <View style={{ borderWidth: 1, borderColor: "#E6E6E6" }}></View>
              <View>
                <Text style={styles.priceText}>€ 30</Text>
                <Text style={styles.priceDes}>Response Time</Text>
              </View>
            </View> */}
          </View>
          <Space height={25} />

          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.textTitle}>Description</Text>
            <Space height={10} />
            <Text style={styles.textDescription}>{data?.description}</Text>
            <Space height={24} />
            <Text style={styles.textTitle}>Qualification</Text>
            <Space height={10} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon icon={teacher} l />
              <Text style={[styles.textDescription, { marginLeft: 10 }]}>
                {data?.qualification}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {user?._id != data?.tutor._id && (
            <Button
              title="Message Request"
              onPress={_sendMessageRequest}
              status={isLoading ? "loading" : null}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: Color.dark1,
    fontSize: 16,
    fontFamily: "sofia-medium",
    lineHeight: 26,
  },
  textDescription: {
    color: Color.dark3,
    fontSize: 16,
    fontFamily: "sofia-regular",
    lineHeight: 26,
  },
  priceText: {
    fontSize: 16, //18
    fontFamily: "sofia-medium",
    lineHeight: 20, //26
    color: Color.dark1,
    //textAlign: "center",
  },
});

export default TutorDetailScreen;
