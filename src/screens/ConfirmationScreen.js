import { SafeAreaView } from "react-native-safe-area-context";
import Space from "../components/common/Space";
import { Color } from "../const/color";
import { Image, Text, View } from "react-native";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";

const confirmIcon = require("../../assets/images/confirmation.png");

const ConfirmationScreen = () => {
  //Navigation
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Space height={200} />
        <Image
          source={confirmIcon}
          style={{ width: 150, height: 150, resizeMode: "contain" }}
        />
        <Space height={20} />
        <Text
          style={{
            color: Color.dark1,
            fontFamily: "sofia-medium",
            fontSize: 16,
            lineHeight: 36,
          }}
        >
          You have successfully updated your profile
        </Text>
        <Button
          title={"Go Home"}
          onPress={() => navigation.navigate("Tab Nav")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
