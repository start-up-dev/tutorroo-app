import { SafeAreaView, ScrollView, Text } from "react-native";
import { Color } from "../const/color";
import TutorCard from "../components/common/TutorCard";
import Space from "../components/common/Space";

const FavouriteScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <TutorCard />
        <TutorCard />
        <TutorCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
