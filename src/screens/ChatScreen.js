import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Color } from "../const/color";
import ChatText from "../components/Message/ChatText";

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.background,
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <ChatText />

        <Text style={styles.noticeText}>
          Your request has not been accepted yet. We will keep you informed
          about updates.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noticeText: {
    textAlign: "center",
    color: Color.danger1,
    fontSize: 14,
    fontFamily: "sofia-medium",
    lineHeight: 24,
    marginVertical: 20,
  },
});

export default ChatScreen;
