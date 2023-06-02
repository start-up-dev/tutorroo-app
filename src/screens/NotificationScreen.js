import { SafeAreaView, ScrollView, Text, StyleSheet, View, Image } from "react-native";
import { Color } from "../const/color";
import Icon from "../components/common/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "../api/notifications";
import moment from "moment";

const sad = require("../../assets/images/emoji-sad.png");
const bell = require("../../assets/images/notification-bell.png");

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const { notifications, status } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingVertical: 12 }}>
        {status == "succeeded" && notifications.length == 0 && (
          <View style={styles.notFound}>
            <Icon icon={sad} xxl />
            <Text style={styles.notFoundText}>No Notification Found</Text>
          </View>
        )}

        {notifications.map((n, idx) => (
          <View key={idx} style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: n?.seen ? "#ffffff" : "#E6E6E6", flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image source={bell} style={{ width: 40, height: 40 }} />

            <View style={{ paddingLeft: 8, alignItems: "flex-end" }}>
              <Text
                style={{
                  color: n?.seen ? Color.dark3 : Color.dark1,
                  fontWeight: n?.seen ? "normal" : "bold",
                }}
              >
                {n?.message}
              </Text>

              <Text style={{ color: Color.dark3, fontSize: 12 }}>{moment(n?.createdAt).format("lll")}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notFound: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontFamily: "sofia-medium",
    fontSize: 16,
    lineHeight: 26,
    color: Color.dark3,
    marginTop: 20,
  },
});

export default NotificationScreen;
