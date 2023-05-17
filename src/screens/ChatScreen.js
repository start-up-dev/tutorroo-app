import { SafeAreaView, ScrollView, Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Color } from "../const/color";
import ChatText from "../components/Message/ChatText";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAsSeenAll } from "../store/inboxSlice";
import { getMessages, sendMessage } from "../api/inbox";

import attachmentsIcon from "../../assets/images/attach-circle.png";
import sendIcon from "../../assets/images/send.png";

const ChatScreen = ({ route }) => {
  const dispatch = useDispatch();

  const { inbox } = route.params;

  const messages = useSelector((state) => state.inbox.messages.filter((msg) => msg.routeId == inbox.routeId));

  const user = useSelector((state) => state.auth.user?.data);

  useEffect(() => {
    dispatch(markAsSeenAll(inbox._id));

    dispatch(getMessages({ routeId: inbox.routeId, skip: messages.length }));
  }, []);

  const [text, setText] = useState("");

  const conversationStarted = messages.length >= 2;

  const _sendMessage = () => {
    dispatch(
      sendMessage({
        routeId: inbox?.routeId,
        text,
      })
    );

    setText("");
  };

  const scrollView = useRef();
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
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
      >
        {messages.reverse().map((msg, idx) => (
          <ChatText msg={msg} key={idx} />
        ))}

        {!conversationStarted && (
          <Text style={styles.noticeText}>
            {user?._id == inbox?.lastMessage?.sender && messages.length == 1 ? "Your request has not been accepted yet. We will keep you informed about updates." : "Reply or ignore this message."}
          </Text>
        )}
      </ScrollView>

      {(user?._id != inbox?.lastMessage?.sender || messages.length > 1) && (
        <View style={{ display: "flex", flexDirection: "row", paddingVertical: 8, paddingHorizontal: 12, justifyContent: "center", alignItems: "center" }}>
          <View style={{ borderWidth: 1, borderColor: "#DFDADA", borderRadius: 20, flex: 1, flexDirection: "row", padding: 4, justifyContent: "center", alignItems: "center" }}>
            <TextInput value={text} onChangeText={(v) => setText(v)} style={{ paddingVertical: 4, paddingHorizontal: 12, flex: 1 }} placeholder="Write message" />

            <TouchableOpacity onPress={() => {}}>
              <Image source={attachmentsIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={_sendMessage}
            style={{
              marginLeft: 12,
              backgroundColor: "#EAECFF",
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Image source={sendIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      )}
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
