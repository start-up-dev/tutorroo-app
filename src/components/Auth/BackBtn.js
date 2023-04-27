import { TouchableOpacity, Text, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../const/color";

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Color.background }}>
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BackBtn;
