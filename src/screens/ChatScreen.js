import { SafeAreaView, ScrollView, Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ActivityIndicator, ToastAndroid, Platform } from "react-native";
import { Color } from "../const/color";
import ChatText from "../components/Message/ChatText";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, markAsSeenAll, messageRequestStatusChanged, setSelectedRouteId } from "../store/inboxSlice";
import { changeMessageRequestStatus, getMessages, sendMessage } from "../api/inbox";
import attachmentsIcon from "../../assets/images/attach-circle.png";
import sendIcon from "../../assets/images/send.png";
import { uploadFileV2 } from "../api/files";
import * as DocumentPicker from "expo-document-picker";

const ChatScreen = ({
  route: {
    params: { inbox },
  },
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const messages = useSelector((state) => state.inbox.messages.filter((msg) => msg.routeId == inbox.routeId));

  useEffect(() => {
    if (inbox) {
      dispatch(markAsSeenAll(inbox._id));

      dispatch(getMessages({ routeId: inbox.routeId, skip: messages.length }));
    }

    return () => {
      dispatch(clearMessages());
      dispatch(setSelectedRouteId(null));
    };
  }, [inbox]);

  const [text, setText] = useState("");

  const [uploadingAttachment, setUploadingAttachment] = useState(false);

  const _sendMessage = () => {
    dispatch(
      sendMessage({
        routeId: inbox?.routeId,
        text,
      })
    );

    setText("");
  };

  const pickDocs = async () => {
    try {
      let res = await DocumentPicker.getDocumentAsync();

      if (res.type == "success") {
        setUploadingAttachment(true);

        const data = await uploadFileV2(res);

        dispatch(
          sendMessage({
            routeId: inbox?.routeId,
            attachments: [data.attachment?._id],
          })
        );

        setUploadingAttachment(false);
      }
    } catch (error) {
      if ((Platform.OS = "android")) {
        ToastAndroid.show("Something went wrong.", ToastAndroid.LONG);
      }
    }
  };

  const scrollView = useRef();

  const handleChangeMessageRequestState = async (status = "rejected") => {
    dispatch(
      messageRequestStatusChanged({
        routeId: inbox.routeId,
        status,
      })
    );

    changeMessageRequestStatus(inbox.routeId, status);
  };

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
        <Messages routeId={inbox.routeId} />

        {inbox?.status == "pending" && inbox?.creator != user?._id && (
          <View style={{ flex: 1, flexDirection: "row", marginVertical: 8 }}>
            <TouchableOpacity
              onPress={() => handleChangeMessageRequestState("rejected")}
              style={{
                padding: 12,
                backgroundColor: "#FFE8E8",
                flex: 1,
                marginRight: 8,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#EB5656",
                  textAlign: "center",
                }}
              >
                Reject
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleChangeMessageRequestState("approved")}
              style={{
                padding: 12,
                backgroundColor: "#00C78E",
                flex: 1,
                marginLeft: 8,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {inbox?.status == "pending" && inbox?.creator == user?._id && <Text style={styles.noticeText}>Your request has not been accepted yet. We will keep you informed about updates.</Text>}

        {inbox?.status == "rejected" && <Text style={styles.noticeText}>Message request was rejected.</Text>}

        {inbox?.status == "answered" && <Text style={styles.successText}>This question is marked as completed.</Text>}
      </ScrollView>

      {inbox?.status == "approved" && (
        <View style={{ display: "flex", flexDirection: "row", paddingVertical: 8, paddingHorizontal: 12, justifyContent: "center", alignItems: "center" }}>
          <View style={{ borderWidth: 1, borderColor: "#DFDADA", borderRadius: 20, flex: 1, flexDirection: "row", padding: 4, justifyContent: "center", alignItems: "center" }}>
            <TextInput value={text} onChangeText={(v) => setText(v)} style={{ paddingVertical: 4, paddingHorizontal: 12, flex: 1 }} placeholder="Write message" />

            {uploadingAttachment ? (
              <ActivityIndicator size="small" color={Color.primaryDeep} style={{ marginRight: 8 }} />
            ) : (
              <TouchableOpacity onPress={pickDocs}>
                <Image source={attachmentsIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
              </TouchableOpacity>
            )}
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

const Messages = ({ routeId }) => {
  const messages = useSelector((state) => state.inbox.messages.filter((msg) => msg.routeId == routeId));

  return (
    <>
      {messages.map((msg, idx) => (
        <ChatText msg={msg} key={idx} />
      ))}
    </>
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
  successText: {
    textAlign: "center",
    color: Color.info,
    fontSize: 14,
    fontFamily: "sofia-medium",
    lineHeight: 24,
    marginVertical: 20,
  },
});

export default ChatScreen;
