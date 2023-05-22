import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { Color } from "../const/color";
import Icon from "../components/common/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "../api/notifications";

const sad = require("../../assets/images/emoji-sad.png");

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const { notifications, status } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {status == "loading" && <Text>Loading...</Text>}

        {status == "succeeded" && notifications.length == 0 && (
          <View style={styles.notFound}>
            <Icon icon={sad} xxl />
            <Text style={styles.notFoundText}>No Notification Found</Text>
          </View>
        )}

        {notifications.map((n, idx) => (
          <View key={idx} style={{ padding: 12, marginBottom: 8, backgroundColor: "#f1f1f1", borderBottomColor: n.seen ? "transparent" : "red", borderBottomWidth: 3 }}>
            <Text>{n?.message}</Text>
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
