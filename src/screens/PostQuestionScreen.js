import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Space from "../components/common/Space";
import { Color } from "../const/color";
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback, useState } from "react";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";

const attachIcon = require("../../assets/images/attach-circle-red.png");

const PostQuestionScreen = () => {
  const [subOpen, setSubOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);

  const [subValue, setSubValue] = useState(null);
  const [levelValue, setLevelValue] = useState(null);

  const subjects = [
    { label: "Math", value: "Math" },
    { label: "Physics", value: "Physics" },
  ];

  const levels = [
    { label: "University", value: "University" },
    { label: "Adult/Casual", value: "Adult/Casual" },
  ];

  const onSubOpen = useCallback(() => {
    setLevelOpen(false);
  }, []);

  const onLevelOpen = useCallback(() => {
    setSubOpen(false);
  }, []);
  return (
    <SafeAreaView style={styles.contains}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <View style={{ zIndex: 4 }}>
          <DropDownPicker
            open={subOpen}
            value={subValue}
            items={subjects}
            onOpen={onSubOpen}
            setOpen={setSubOpen}
            setValue={setSubValue}
            dropDownContainerStyle={styles.dropdown}
            style={styles.dropdownPicker}
            placeholder="Choose a subject"
          />
        </View>
        <Space height={15} />

        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            open={levelOpen}
            value={levelValue}
            items={levels}
            onOpen={onLevelOpen}
            setOpen={setLevelOpen}
            setValue={setLevelValue}
            dropDownContainerStyle={styles.dropdown}
            style={styles.dropdownPicker}
            placeholder="Choose a level"
          />
        </View>
        <Space height={15} />

        <TextInput
          placeholder="Write your quesion here"
          style={styles.textInput}
          multiline
        />
        <Space height={25} />
        <View style={styles.attachView}>
          <Icon icon={attachIcon} l />
          <Text style={styles.attachText}>Attach file</Text>
        </View>

        <Space height={25} />

        <Button title="Post A Question" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contains: {
    backgroundColor: Color.background,
    flex: 1,
  },
  dropdown: {
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Color.background,
  },
  dropdownPicker: {
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Color.background,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFDADA",
    padding: 18,
    paddingTop: 10,
  },
  attachText: {
    color: Color.primaryDeep,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "sofia-bold",
  },
  attachView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostQuestionScreen;
