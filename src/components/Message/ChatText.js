import { Text, View, StyleSheet, Image } from "react-native";
import Icon from "../common/Icon";
import { Color } from "../../const/color";
import { useSelector } from "react-redux";
import moment from "moment";

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
