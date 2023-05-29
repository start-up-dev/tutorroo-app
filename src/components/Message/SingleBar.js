import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../const/color";
import getFullName from "../../utils/name";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { clearMessages, setSelectedRouteId } from "../../store/inboxSlice";

const profile = require("../../../assets/profile.jpeg");

const SingleBar = ({ inbox }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(clearMessages());
        dispatch(setSelectedRouteId(inbox.routeId));
        navigation.navigate("Chat", { inbox });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {inbox?.question ? (
          <View style={styles.profileImg}>
            <Text style={{ fontSize: 30, fontWeight: "900" }}>?</Text>
          </View>
        ) : (
          <Image source={profile} style={styles.profileImg} />
        )}

        <View>
          <Text style={{ fontWeight: 600 }} numberOfLines={1}>
            {inbox?.question || getFullName(inbox?.participant?.firstName, inbox?.participant?.lastName)}
          </Text>
          <Text style={{ color: Color.dark3, marginTop: 10 }}>{inbox?.lastMessage?.text || "Attachment"}</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: Color.primaryDeep, fontSize: 10 }}>{moment(inbox?.lastMessageSendAt).fromNow()}</Text>

        {Boolean(inbox?.numberOfUnSeenMessages) && (
          <View
            style={{
              backgroundColor: Color.primaryDeep,
              borderRadius: 100,
              width: 18,
              padding: 2,
              marginTop: 10,
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 10,
                color: Color.secondaryDeep,
              }}
            >
              {inbox?.numberOfUnSeenMessages}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleBar;
