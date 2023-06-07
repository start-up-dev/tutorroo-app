import { SafeAreaView, ScrollView, View } from "react-native";
import Subject from "../components/Home/Subject";
import { useSelector } from "react-redux";
import { Color } from "../const/color";

const ViewAllSubjectScreen = () => {
  const subject = useSelector((state) => state.tutor.subject);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingVertical: 12 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {subject?.length > 0 &&
            subject?.map((item) => <Subject key={item._id} data={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAllSubjectScreen;
