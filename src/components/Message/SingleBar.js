import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../../const/color";

const profile = require("../../../assets/profile.jpeg");

const SingleBar = () => {
  //Navigation
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Chat")}
    >
      <View style={{ flexDirection: "row" }}>
        <Image source={profile} style={styles.profileImg} />

        <View>
          <Text style={{ fontWeight: 600 }}>Isfat</Text>
          <Text style={{ color: Color.dark3, marginTop: 10 }}>Hi!</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: Color.primaryDeep, fontSize: 10 }}>10:30 am</Text>
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
            2
          </Text>
        </View>
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
  },
});

export default SingleBar;
