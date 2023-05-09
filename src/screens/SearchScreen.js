import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import DropDownPicker from "react-native-dropdown-picker";
import { Color } from "../const/color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Space from "../components/common/Space";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { searchTutor } from "../api/tutor";
import ErrorMessage from "../components/common/ErrorMessage";

const pq = require("../../assets/images/document-text.png");

const height = Dimensions.get("window").height;

const myTheme = require("../components/common/dropdownTheme");

DropDownPicker.addTheme("Tutorro", myTheme);
DropDownPicker.setTheme("Tutorro");

const SearchScreen = () => {
  const [subOpen, setSubOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [eirOpen, setEirOpen] = useState(false);

  const [subValue, setSubValue] = useState(null);
  const [levelValue, setLevelValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [eirValue, setEirValue] = useState(null);

  const [invalid, setInvalid] = useState();

  //Navigation
  const navigation = useNavigation();

  const status = useSelector((state) => state.tutor.state);

  const dispatch = useDispatch();

  const subjects = [
    { label: "Math", value: "Math" },
    { label: "Physics", value: "Physics" },
  ];

  const levels = [
    { label: "University", value: "University" },
    { label: "Adult/Casual", value: "Adult/Casual" },
  ];

  const types = [
    { label: "One to one", value: "One to one" },
    { label: "Online", value: "Online" },
  ];

  const eircodes = [
    { label: "A65 F4E2", value: "A65 F4E2" },
    { label: "A65 F4E4", value: "A65 F4E4" },
  ];

  const onSubOpen = useCallback(() => {
    setEirOpen(false);
    setLevelOpen(false);
    setTypeOpen(false);
  }, []);

  const onLevelOpen = useCallback(() => {
    setEirOpen(false);
    setSubOpen(false);
    setTypeOpen(false);
  }, []);

  const onTypeOpen = useCallback(() => {
    setEirOpen(false);
    setSubOpen(false);
    setLevelOpen(false);
  }, []);

  const onEirOpen = useCallback(() => {
    setLevelOpen(false);
    setSubOpen(false);
    setTypeOpen(false);
  }, []);

  const onSearch = () => {
    const body = {
      subject: subValue,
      type: typeValue,
      level: levelValue,
    };

    if (subValue) {
      setInvalid("");
      dispatch(searchTutor(body));
      navigation.navigate("Tutor");
    } else {
      setInvalid("Please Choose a Subject");
    }

    console.log(body);
  };

  return (
    <SafeAreaView style={styles.contains}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />

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
          zIndex={3000}
          zIndexInverse={1000}
        />
        <Space height={15} />

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
          zIndex={2000}
          zIndexInverse={2000}
        />
        <Space height={15} />

        <DropDownPicker
          open={typeOpen}
          value={typeValue}
          onOpen={onTypeOpen}
          items={types}
          setOpen={setTypeOpen}
          setValue={setTypeValue}
          dropDownContainerStyle={styles.dropdown}
          style={styles.dropdownPicker}
          placeholder="Choose a Tuition Type"
          zIndex={1000}
          zIndexInverse={3000}
        />

        {typeValue === "One to one" && (
          <>
            <Space height={15} />

            <DropDownPicker
              open={eirOpen}
              value={eirValue}
              items={eircodes}
              onOpen={onEirOpen}
              setOpen={setEirOpen}
              setValue={setEirValue}
              dropDownContainerStyle={styles.dropdown}
              style={styles.dropdownPicker}
              placeholder="Choose your EIRCODE"
              zIndex={500}
              zIndexInverse={3500}
            />
          </>
        )}

        <Space height={30} />

        <ErrorMessage message={invalid} />

        <Button
          title={"Search For Turors"}
          status={status}
          onPress={onSearch}
        />

        <View style={styles.postBtn}>
          <Image
            source={pq}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
          <Text style={styles.postText}>Post A Question</Text>
        </View>
      </View>
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
  postBtn: {
    borderWidth: 1,
    borderColor: Color.primaryDeep,
    borderRadius: 12,
    backgroundColor: Color.primarylight,
    padding: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
    position: "absolute",
    top: Platform.OS === "ios" ? height - 250 : height - 180,
    right: 20,
    alignItems: "center",
  },
  postText: {
    color: Color.primaryDeep,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "sofia-light",
  },
});

export default SearchScreen;
