import { TouchableOpacity, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../const/color";
import Icon from "../common/Icon";

const leftIcon = require("../../../assets/images/arrow-left.png");

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Color.background }}>
      <TouchableOpacity
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icon icon={leftIcon} xl />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BackBtn;
