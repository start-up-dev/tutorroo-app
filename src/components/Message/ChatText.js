import { Text, View, StyleSheet } from "react-native";
import Icon from "../common/Icon";
import { Color } from "../../const/color";

const sentIcon = require("../../../assets/images/tick-square-active.png");
const ChatText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timeStampView}>
        <Icon icon={sentIcon} />
        <Text style={styles.timeStamp}>9:12 am</Text>
      </View>
      <Text style={styles.messageText}>
        Lorem ipsum dolor sit amet ectetur. Elementum proin tum nunc ipiscing
        scelerisque volutpat et eget. bortis unc urna eget donec. Interdum um
        rutrum interdum.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
