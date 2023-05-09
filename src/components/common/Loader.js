import React from "react";
import {
  useWindowDimensions,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Color } from "../../const/color";

const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height: height - 400, width }]}>
        <ActivityIndicator size="large" color={Color.primaryDeep} />
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    zIndex: 10,
    justifyContent: "center",
  },
});

export default Loader;
