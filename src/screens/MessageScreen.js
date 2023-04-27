import { SafeAreaView, TextInput, StyleSheet, ScrollView } from "react-native";
import { Color } from "../const/color";
import SingleBar from "../components/Message/SingleBar";
import Space from "../components/common/Space";

const MessageScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Space height={20} />
        <SingleBar />
        <SingleBar />
        <SingleBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    padding: 10,
    borderColor: Color.dark4,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default MessageScreen;
