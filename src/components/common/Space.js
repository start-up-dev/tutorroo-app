import React from "react";
import { View } from "react-native";

function Space({ width, height }) {
  return <View style={{ width: width || 0, height: height || 0 }}></View>;
}

export default Space;
