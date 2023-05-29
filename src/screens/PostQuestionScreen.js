import { SafeAreaView, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, ToastAndroid } from "react-native";
import Space from "../components/common/Space";
import { Color } from "../const/color";
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback, useState } from "react";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { uploadFile, uploadFileV2 } from "../api/files";
import { sendMessageRequest } from "../api/inbox";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearMessages, setSelectedRouteId } from "../store/inboxSlice";

const attachIcon = require("../../assets/images/attach-circle-red.png");
const closeIcon = require("../../assets/images/close-circle-red.png");

const PostQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [subOpen, setSubOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);

  const [subValue, setSubValue] = useState(null);
  const [levelValue, setLevelValue] = useState(null);
  const [question, setQuestion] = useState("");
  const [docs, setDocs] = useState([]);

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

  const pickDocs = async () => {
    try {
      let res = await DocumentPicker.getDocumentAsync();

      if (res.type == "success") {
        const data = await uploadFileV2(res);

        setDocs((prev) => [...prev, data.attachment]);
      }
    } catch (error) {
      if ((Platform.OS = "android")) {
        ToastAndroid.show("Something went wrong.", ToastAndroid.LONG);
      }
    }
  };

  const [status, setStatus] = useState();

  const handlePostAQuestion = async () => {
    try {
      if (question == "") {
        if ((Platform.OS = "android")) {
          ToastAndroid.show("Question is required.", ToastAndroid.LONG);
        }

        return;
      }

      setStatus("loading");

      const inbox = await sendMessageRequest(
        "643bfc50926f6f9dd8848e40",
        subValue,
        levelValue,
        question,
        docs.map((d) => d._id)
      );

      dispatch(clearMessages());
      dispatch(setSelectedRouteId(inbox.routeId));
      navigation.navigate("Chat", { inbox });
      setStatus(null);
      setDocs([]);
    } catch (error) {
      setStatus(null);

      if ((Platform.OS = "android")) {
        ToastAndroid.show(error?.response?.data?.issue?.message || "Something went wrong.", ToastAndroid.LONG);
      }
    }
  };

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

        <TextInput value={question} onChangeText={setQuestion} placeholder="Write your question here" style={styles.textInput} multiline />

        <Space height={25} />

        {docs.map((doc, idx) => (
          <View
            key={idx}
            style={{ display: "flex", marginBottom: 8, flexDirection: "row", borderColor: Color.border, borderWidth: 1, borderRadius: 12, backgroundColor: Color.background, padding: 8 }}
          >
            <Text style={{ flex: 1 }}>{doc?.name}</Text>

            <TouchableOpacity onPress={() => setDocs((prev) => prev.filter((d) => d != doc))}>
              <Icon icon={closeIcon} l />
            </TouchableOpacity>
          </View>
        ))}

        <Space height={25} />
        <TouchableOpacity style={styles.attachView} onPress={pickDocs}>
          <Icon icon={attachIcon} l />
          <Text style={styles.attachText}>Attach file</Text>
        </TouchableOpacity>

        <Space height={25} />

        <Button title="Post A Question" status={status} onPress={handlePostAQuestion} />
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
