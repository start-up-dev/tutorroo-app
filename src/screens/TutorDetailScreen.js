import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Profile/Header";
import { Color } from "../const/color";
import Space from "../components/common/Space";
import Icon from "../components/common/Icon";
import Button from "../components/common/Button";
import { sendMessageRequest } from "../api/inbox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInboxes } from "../store/inboxSlice";

const teacher = require("../../assets/images/teacher.png");

const TutorDetailScreen = ({ route }) => {
  const { tutor } = route.params;

  const [isLoading, setLoading] = useState(false);

  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _sendMessageRequest = async () => {
    try {
      setLoading(true);
      const inbox = await sendMessageRequest(tutor._id);
      setLoading(false);
      dispatch(addInboxes([inbox]));
      navigation.navigate("Chat", { inbox });
    } catch (error) {
      setLoading(false);

      alert(error?.response?.data?.issue?.message || error?.message);
    }
  };
  console.log(tutor);
  return (
    <>
      <Header tutorProfile data={tutor} />

      <SafeAreaView
        style={{
          backgroundColor: Color.background,
          flex: 1,
        }}
      >
        <Space height={25} />
        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.textTitle}>Description</Text>
          <Space height={10} />
          <Text style={styles.textDescription}>
            Lorem ipsum dolor sit amet consectetur. Pharetra viverra accumsan
            neque neque faucibus sed. Utpat condimentum quam eget vitae amet
            sapien. Mattis natoque morbi quam in morbi sodales. In arcu erat
            tincidunt urna fermentum elit. At vulputate nulla torto erat
            facilisi adipiscing eget auctor vulputate.
          </Text>
          <Space height={24} />
          <Text style={styles.textTitle}>Qualification</Text>
          <Space height={10} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={teacher} l />
            <Text style={[styles.textDescription, { marginLeft: 10 }]}>
              Phd in Mathmatics
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Button
            title="Message Request"
            onPress={_sendMessageRequest}
            status={isLoading ? "loading" : null}
          />
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
});

export default TutorDetailScreen;
