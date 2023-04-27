import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Color } from "../const/color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Space from "../components/common/Space";
import Button from "../components/common/Button";

const height = Dimensions.get("window").height;

const SearchScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <SafeAreaView style={styles.contains}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={20} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropdown}
          style={styles.dropdownPicker}
          placeholder="Choose a subject"
        />
        <Space height={15} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropdown}
          style={styles.dropdownPicker}
          placeholder="Choose a level"
        />
        <Space height={15} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropdown}
          style={styles.dropdownPicker}
          placeholder="Choose a Tuition Type"
        />

        <Space height={30} />

        <Button title={"Search For Turors"} />

        <View style={styles.postBtn}>
          <FontAwesomeIcon
            icon="fa-solid fa-circle-question"
            style={{ color: Color.primaryDeep }}
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
    width: "45%",
    alignSelf: "flex-end",
    flexDirection: "row",
    position: "absolute",
    top: height - 250,
    right: 20,
  },
  postText: {
    color: Color.primaryDeep,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
  },
});

export default SearchScreen;
