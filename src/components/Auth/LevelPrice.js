import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "../common/Icon";
import { Color } from "../../const/color";

const tickIcon = require("../../../assets/images/tick-square.png");
const tickIconActive = require("../../../assets/images/tick-square-active.png");

const LevelPrice = ({ title, onPress, setPrice, iconName, index }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Icon icon={iconName} l />
      </TouchableOpacity>
      <Text style={styles.levelText}>{title}</Text>
      <TextInput
        style={styles.levelInput}
        onChangeText={(text) => setPrice(index, text)}
        placeholder="20.00"
      />
      <Text style={styles.levelText}>euro/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Color.dark2,
    fontFamily: "sofia-medium",
    lineHeight: 16,
  },
  levelInput: {
    borderWidth: 1,
    borderColor: "#DFDADA",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginLeft: 25,
    width: 80,
  },
  levelText: {
    fontSize: 16,
    color: Color.dark2,
    fontFamily: "sofia-light",
    lineHeight: 16,
    marginLeft: 15,
    width: "40%",
  },
});

export default LevelPrice;
