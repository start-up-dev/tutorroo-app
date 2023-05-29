import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "../common/Icon";
import { Color } from "../../const/color";
import { useSelector } from "react-redux";
import moment from "moment";
import { openBrowserAsync } from "expo-web-browser";

const sentIcon = require("../../../assets/images/tick-square-active.png");

const ChatText = ({ msg }) => {
  const user = useSelector((state) => state?.auth?.user?.data);

  if (msg?.metadata?.type == "image") {
    return (
      <View style={{ width: "100%", marginVertical: 10, alignItems: user?._id == msg.sender._id ? "flex-end" : "flex-start" }}>
        {msg.attachments?.map((uri, idx) => (
          <Image source={{ uri: uri }} key={idx} style={{ height: 200, width: 200, backgroundColor: "rgba(0,0,0,0.02)", borderRadius: 10 }} resizeMode="contain" />
        ))}
      </View>
    );
  }

  if (user?._id == msg.sender._id) {
    return (
      <View style={styles.myMessageContainer}>
        <Text style={styles.messageText}>{msg?.text}</Text>

        <View style={styles.timeStampView}>
          <Icon icon={sentIcon} />
          <Text style={styles.timeStamp}>{moment(msg?.createdAt).fromNow()}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.timeStampView}>
          <Icon icon={sentIcon} />
          <Text style={styles.timeStamp}>{moment(msg?.createdAt).fromNow()}</Text>
        </View>

        <Text style={styles.messageText}>{msg?.text}</Text>

        <FlatList
          style={{ marginTop: 12 }}
          data={msg?.attachments}
          renderItem={({ item: attachment }) => {
            if (attachment?.type == "unknown") {
              return (
                <TouchableOpacity
                  onPress={() => openBrowserAsync(attachment?.url)}
                  style={{ flex: 1, height: 120, justifyContent: "center", alignItems: "center", backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
                >
                  <Text style={{ fontSize: 12 }}>Unknown file</Text>
                </TouchableOpacity>
              );
            } else if (attachment?.type == "image") {
              return <Image source={{ uri: attachment?.url }} style={{ flex: 1, height: 120 }} />;
            } else if (attachment?.type == "pdf") {
              return (
                <TouchableOpacity
                  onPress={() => openBrowserAsync(attachment?.url)}
                  style={{ flex: 1, height: 120, justifyContent: "center", alignItems: "center", backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
                >
                  <Text style={{ fontSize: 24 }}>PDF</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => openBrowserAsync(attachment?.url)}
                  style={{ flex: 1, height: 120, justifyContent: "center", alignItems: "center", backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
                >
                  <Text style={{ fontSize: 24 }}>Doc.</Text>
                </TouchableOpacity>
              );
            }
          }}
          //Setting the number of column
          numColumns={3}
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
    marginLeft: 5,
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
