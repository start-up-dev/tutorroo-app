import { Image, Text, View, StyleSheet } from "react-native";
import { Color } from "../../const/color";

const profile = require("../../../assets/profile.jpeg");

const SingleBar = () => {
  return (
    <View style={styles.container}>
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
    </View>
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
