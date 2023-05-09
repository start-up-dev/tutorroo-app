import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { Color } from "../const/color";
import Icon from "../components/common/Icon";

const sad = require("../../assets/images/emoji-sad.png");

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={styles.notFound}>
          <Icon icon={sad} xxl />
          <Text style={styles.notFoundText}>No Notifcation Found</Text>
        </View>
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
