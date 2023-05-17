import { SafeAreaView, TextInput, StyleSheet, ScrollView, Text, RefreshControl } from "react-native";
import { Color } from "../const/color";
import SingleBar from "../components/Message/SingleBar";
import Space from "../components/common/Space";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInboxes } from "../api/inbox";

const MessageScreen = () => {
  const dispatch = useDispatch();
  const { status, inboxes } = useSelector((state) => state.inbox);

  useEffect(() => {
    dispatch(getInboxes());
  }, []);

  const _onRefresh = () => {
    dispatch(getInboxes());
  };

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }} refreshControl={<RefreshControl refreshing={status == "loading"} onRefresh={_onRefresh} />}>
        <Space height={10} />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Space height={20} />

        {status == "succeeded" && inboxes.length == 0 && <Text>Inbox is empty.</Text>}

        {inboxes?.map((inbox, idx) => (
          <SingleBar inbox={inbox} key={idx} />
        ))}
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
