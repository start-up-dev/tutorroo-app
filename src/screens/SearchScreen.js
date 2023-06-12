import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import DropDownPicker from "react-native-dropdown-picker";
import { Color } from "../const/color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Space from "../components/common/Space";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, searchTutor } from "../api/tutor";
import ErrorMessage from "../components/common/ErrorMessage";
import { subjects } from "../store/tutorSlice";

const pq = require("../../assets/images/document-text.png");

const height = Dimensions.get("window").height;

const myTheme = require("../components/common/dropdownTheme");

DropDownPicker.addTheme("Tutorro", myTheme);
DropDownPicker.setTheme("Tutorro");

const SearchScreen = () => {
  const [subOpen, setSubOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const [subValue, setSubValue] = useState(null);
  const [levelValue, setLevelValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [location, setLocation] = useState(null);

  const [invalid, setInvalid] = useState();

  //Navigation
  const navigation = useNavigation();

  const status = useSelector((state) => state.tutor.status);
  const tutor = useSelector((state) => state.tutor.tutor);
  const allSubject = useSelector((state) => state.tutor.subject);
  const subjectObj = useSelector((state) => state.tutor.subjectObj);

  const dispatch = useDispatch();

  const levels = [
    { label: "Junior Cycle", value: "Junior Cycle" },
    { label: "University", value: "University" },
    { label: "Adult/Casual", value: "Adult/Casual" },
  ];

  const types = [
    { label: "In Person", value: "oneToOne" },
    { label: "Online", value: "online" },
  ];

  const onSubOpen = useCallback(() => {
    setLevelOpen(false);
    setTypeOpen(false);
  }, []);

  const onLevelOpen = useCallback(() => {
    setSubOpen(false);
    setTypeOpen(false);
  }, []);

  const onTypeOpen = useCallback(() => {
    setSubOpen(false);
    setLevelOpen(false);
  }, []);

  const onSearch = () => {
    const body = {
      subject: subValue,
      type: typeValue,
      level: levelValue,
      location: location,
    };

    if (subValue) {
      setInvalid("");
      dispatch(searchTutor(body));
    } else {
      setInvalid("Please Choose a Subject");
    }
  };

  useEffect(() => {
    if (tutor?.message === "Data getting successfully") {
      navigation.navigate("Tutor", {
        data: { screen: "search" },
      });
    }
  }, [tutor]);

  useEffect(() => {
    if (allSubject == null) {
      dispatch(getSubject());
    }
  }, [allSubject]);

  return (
    <SafeAreaView style={styles.contains}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />

        {subjectObj != null && (
          <View style={{ zIndex: 4 }}>
            <DropDownPicker
              open={subOpen}
              value={subValue}
              items={subjectObj}
              onOpen={onSubOpen}
              setOpen={setSubOpen}
              setValue={setSubValue}
              dropDownContainerStyle={styles.dropdown}
              style={styles.dropdownPicker}
              placeholder="Choose a subject"
            />
          </View>
        )}
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

        <View style={{ zIndex: 2 }}>
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
          />
        </View>

        {typeValue === "oneToOne" && (
          <>
            <Space height={15} />

            <View style={{ zIndex: 1 }}>
              <TextInput
                placeholder="Enter Location"
                onChangeText={(text) => setLocation(text)}
                style={styles.location}
              />
            </View>
          </>
        )}

        <Space height={30} />

        <ErrorMessage message={invalid} />

        <Button
          title={"Search For Turors"}
          status={status}
          onPress={onSearch}
        />

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigation.navigate("Post Question")}
        >
          <Image
            source={pq}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
          <Text style={styles.postText}>Post A Question</Text>
        </TouchableOpacity>
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
  location: {
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    color: Color.dark1,
    fontSize: 16,
    fontFamily: "sofia-light",
    lineHeight: 18,
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
