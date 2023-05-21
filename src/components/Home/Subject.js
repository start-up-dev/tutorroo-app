import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Color } from "../../const/color";

const image = require("../../../assets/physics.jpeg");

const Subject = ({ data }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={data?.image ? { uri: data?.image } : image}
          style={[
            StyleSheet.absoluteFill,
            { width: "100%", height: "100%", borderRadius: 12 },
          ]}
        />
        <View
          style={{
            backgroundColor: "black",
            opacity: 0.3,
            width: "100%",
            height: "100%",
            borderRadius: 12,
          }}
        ></View>
        <Text style={styles.text}>{data?.name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 40,
    margin: 6,
  },
  text: {
    textAlign: "center",
    color: Color.secondaryDeep,
    position: "relative",
    bottom: 40,
    fontWeight: 500,
    fontSize: 18,
  },
});

export default Subject;
