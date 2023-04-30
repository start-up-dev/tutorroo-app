import { View, Text } from "react-native";
import { Color } from "../../const/color";

const SubjectTag = () => {
  return (
    <View
      style={{
        borderRadius: 6,
        backgroundColor: Color.primarylight,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 100,
      }}
    >
      <Text
        style={{
          color: Color.primaryDeep,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Mathmatics
      </Text>
    </View>
  );
};

export default SubjectTag;