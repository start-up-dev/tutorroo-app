import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Color } from "../const/color";
import ChatText from "../components/Message/ChatText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAsSeenAll } from "../store/inboxSlice";
import { getMessages } from "../api/inbox";

const ChatScreen = ({ route }) => {
  const dispatch = useDispatch();

  const { inbox } = route.params;

  const messages = useSelector((state) => state.inbox.messages.filter((msg) => msg.routeId == inbox.routeId));

  const user = useSelector((state) => state.auth.user?.data);

  useEffect(() => {
    dispatch(markAsSeenAll(inbox._id));

    dispatch(getMessages({ routeId: inbox.routeId, skip: messages.length }));
  }, []);

  console.log("#####################################");
  console.log(JSON.stringify(inbox?.lastMessage.sender == user?._id, null, 4));
  console.log("#####################################");

  const messageRequestApproved = messages.length >= 2;

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
        {messages.map((msg, idx) => (
          <ChatText msg={msg} key={idx} />
        ))}

        {!messageRequestApproved && (
          <Text style={styles.noticeText}>
            {user?._id == inbox?.lastMessage?.sender && messages.length == 1 ? "Your request has not been accepted yet. We will keep you informed about updates." : "Reply or ignore this message."}
          </Text>
        )}
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
