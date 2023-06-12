import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Color } from "../../const/color";
import LevelPrice from "./LevelPrice";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Space from "../common/Space";
import Icon from "../common/Icon";

const tickIconActive = require("../../../assets/images/tick-square-active.png");
const tickIcon = require("../../../assets/images/tick-square.png");
const cancelIcon = require("../../../assets/images/close-circle-red.png");

const AddSubject = ({
  i,
  onRemove,
  data,
  updateLevel,
  updatePrice,
  updateSubject,
  subject,
}) => {
  const [subOpen, setSubOpen] = useState(false);
  const [subValue, setSubValue] = useState("Math");

  useEffect(() => {
    updateSubject(i, subValue);
  }, [subValue]);

  return (
    <View
      style={{
        backgroundColor: Color.primarylight,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <View style={{ zIndex: 100 }}>
        <DropDownPicker
          open={subOpen}
          value={subValue}
          items={subject}
          setOpen={setSubOpen}
          setValue={setSubValue}
          dropDownContainerStyle={styles.dropdown}
          style={styles.dropdownPicker}
          placeholder="Choose a subject"
        />
      </View>
      <Space height={20} />

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.label, { marginRight: "50%" }]}>Level</Text>
          <Text style={styles.label}>Price</Text>
        </View>

        <LevelPrice
          title={"Junior Cycle"}
          onPress={() =>
            data?.level[0].name == "Junior Cycle"
              ? updateLevel(i, 0, "")
              : updateLevel(i, 0, "Junior Cycle")
          }
          iconName={
            data?.level[0].name == "Junior Cycle" ? tickIconActive : tickIcon
          }
          setPrice={updatePrice}
          x={i}
          y={0}
        />
        <LevelPrice
          title={"University"}
          onPress={() =>
            data?.level[1].name == "University"
              ? updateLevel(i, 1, "")
              : updateLevel(i, 1, "University")
          }
          iconName={
            data?.level[1].name == "University" ? tickIconActive : tickIcon
          }
          setPrice={updatePrice}
          x={i}
          y={1}
        />
        <LevelPrice
          title={"Adult/Casual"}
          onPress={() =>
            data?.level[2].name == "Adult/Casual"
              ? updateLevel(i, 2, "")
              : updateLevel(i, 2, "Adult/Casual")
          }
          iconName={
            data?.level[2].name == "Adult/Casual" ? tickIconActive : tickIcon
          }
          setPrice={updatePrice}
          x={i}
          y={2}
        />
      </View>

      {i != 0 && (
        <TouchableOpacity
          onPress={() => onRemove(i)}
          style={{ alignSelf: "flex-end", paddingVertical: 10 }}
        >
          <Icon icon={cancelIcon} l />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: Color.dark2,
    fontFamily: "sofia-semi-bold",
    lineHeight: 36,
  },
  progressBar: {
    borderWidth: 1,
    borderColor: Color.border,
  },
  progressBar50: {
    borderWidth: 1,
    borderColor: Color.primaryDeep,
    width: "50%",
  },
  progressBar100: {
    borderWidth: 1,
    borderColor: Color.primaryDeep,
    width: "100%",
  },
  freeClass: {
    fontSize: 16,
    color: Color.dark1,
    fontFamily: "sofia-regular",
    lineHeight: 16,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: Color.dark2,
    fontFamily: "sofia-medium",
    lineHeight: 16,
  },
  addSub: {
    fontSize: 16,
    color: Color.primaryDeep,
    fontFamily: "sofia-medium",
    lineHeight: 16,
    textAlign: "center",
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
  levelText: {
    fontSize: 16,
    color: Color.dark2,
    fontFamily: "sofia-light",
    lineHeight: 16,
    marginLeft: 10,
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  prevBtn: {
    backgroundColor: Color.primaryDeep,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  prevText: {
    fontSize: 12,
    color: Color.WHITE,
    fontFamily: "sofia-light",
    lineHeight: 16,
  },
});

export default AddSubject;
