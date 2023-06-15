import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "../common/Icon";
import { Color } from "../../const/color";
import { useSelector } from "react-redux";
import moment from "moment";
import { openBrowserAsync } from "expo-web-browser";
import pdfImage from "../../../assets/images/pdf.png";
import docsImage from "../../../assets/images/docs.png";
import unknownFileImage from "../../../assets/images/unknown_file.png";

const seenIcon = require("../../../assets/images/tick-square-active.png");
const sentIcon = require("../../../assets/images/tick-square.png");

const ChatText = ({ msg }) => {
  const user = useSelector((state) => state?.auth?.user);

  if (user?._id == msg.sender._id) {
    return (
      <View style={styles.myMessageContainer}>
        {Boolean(msg?.text) && (
          <Text
            style={{
              color: Color.dark1,
              fontSize: 14,
              fontFamily: "sofia-regular",
              lineHeight: 20,
              textAlign: "right",
            }}
          >
            {msg?.text}
          </Text>
        )}

        <FlatList
          style={{ marginTop: 8 }}
          data={msg?.attachments}
          renderItem={({ item: attachment }) => {
            if (attachment?.type == "unknown") {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginBottom: 12, alignItems: "flex-end" }}>
                  <Image source={unknownFileImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            } else if (attachment?.type == "image") {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginBottom: 12, alignItems: "flex-end" }}>
                  <Image source={{ uri: attachment?.url }} style={{ width: 300, height: 300, borderRadius: 10 }} />
                </TouchableOpacity>
              );
            } else if (attachment?.type == "pdf") {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginBottom: 12, alignItems: "flex-end" }}>
                  <Image source={pdfImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginBottom: 12, alignItems: "flex-end" }}>
                  <Image source={docsImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            }
          }}
          //Setting the number of column
          keyExtractor={(item, index) => index}
        />

        <View style={styles.timeStampView}>
          <View style={{ marginRight: 5 }}>
            <Icon icon={msg?.seen ? seenIcon : sentIcon} />
          </View>

          <Text style={styles.timeStamp}>{moment(msg?.createdAt).format("lll")}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.timeStampView}>
          <Text style={styles.timeStamp}>{moment(msg?.createdAt).format("lll")}</Text>
        </View>

        {msg?.text && <Text style={styles.messageText}>{msg?.text}</Text>}

        <FlatList
          data={msg?.attachments}
          renderItem={({ item: attachment }) => {
            if (attachment?.type == "unknown") {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginTop: 12 }}>
                  <Image source={unknownFileImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            } else if (attachment?.type == "image") {
              return <Image source={{ uri: attachment?.url }} style={{ width: 300, height: 300, borderRadius: 10, marginTop: 12 }} />;
            } else if (attachment?.type == "pdf") {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginTop: 12 }}>
                  <Image source={pdfImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => openBrowserAsync(attachment?.url)} style={{ marginTop: 12 }}>
                  <Image source={docsImage} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              );
            }
          }}
          //Setting the number of column
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  myMessageContainer: {
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    borderBottomEndRadius: 0,
    padding: 10,
    marginVertical: 10,
    display: "flex",
    alignItems: "flex-end",
  },

  container: {
    backgroundColor: Color.primarylight,
    borderRadius: 10,
    borderBottomEndRadius: 0,
    padding: 10,
    marginVertical: 10,
  },
  timeStamp: {
    textAlign: "center",
    color: Color.dark3,
    fontSize: 10,
    fontFamily: "sofia-medium",
    lineHeight: 20,
    marginLeft: 0,
  },
  timeStampView: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    color: Color.dark1,
    fontSize: 14,
    fontFamily: "sofia-regular",
    lineHeight: 20,
  },
});
export default ChatText;
