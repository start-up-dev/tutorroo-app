import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Space from "../components/common/Space";
import Header from "../components/Auth/Header";
import { useState } from "react";
import Input from "../components/Auth/Input";
import Button from "../components/common/Button";
import LevelPrice from "../components/Auth/LevelPrice";
import { Color } from "../const/color";
import Icon from "../components/common/Icon";
import DropDownPicker from "react-native-dropdown-picker";
import ErrorMessage from "../components/common/ErrorMessage";
import { useDispatch } from "react-redux";
import { addTutorDetails } from "../api/tutor";

const locationIcon = require("../../assets/images/location.png");
const callIcon = require("../../assets/images/call-calling.png");
const eirIcon = require("../../assets/images/zip-code.png");
const teacherIcon = require("../../assets/images/teacher.png");
const mq = require("../../assets/images/mq.png");
const bookIcon = require("../../assets/images/book.png");
const tickIcon = require("../../assets/images/tick-square.png");
const tickIconActive = require("../../assets/images/tick-square-active.png");
const closeIcon = require("../../assets/images/close-circle.png");

const TutorAddDetailsScreen = () => {
  const [tab, setTab] = useState(1);
  const [inputError, setInputError] = useState("");
  const [level, setLevel] = useState([]);
  const [inputs, setInputs] = useState({
    addressLine1: "",
    telephone: "",
    country: "Bangladesh",
    eirCode: "",
    qualification: "",
    details: "",
    subjectInfo: {
      subject: "",
    },
    tuitionType: "",
  });

  const dispatch = useDispatch();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const updateLevel = (index, newLevel) => {
    setLevel((prevLevel) => {
      const updatedLevel = [...prevLevel];
      updatedLevel[index] = { ...updatedLevel[index], name: newLevel };
      return updatedLevel;
    });
  };

  const updatePrice = (index, newLevel) => {
    setLevel((prevLevel) => {
      const updatedLevel = [...prevLevel];
      updatedLevel[index] = { ...updatedLevel[index], price: newLevel };
      return updatedLevel;
    });
  };

  const updateInputs = (keyPath, newValue) => {
    setInputs((prevState) => {
      const updatedState = { ...prevState };
      updateValueRecursive(updatedState, keyPath, newValue);
      return updatedState;
    });
  };

  const updateValueRecursive = (obj, keyPath, newValue) => {
    const keys = keyPath.split(".");

    if (keys.length === 1) {
      obj[keys[0]] = newValue;
    } else {
      const currentKey = keys[0];
      if (!obj.hasOwnProperty(currentKey)) {
        obj[currentKey] = {};
      } else if (Array.isArray(obj[currentKey])) {
        obj[currentKey] = [...obj[currentKey]];
      }
      updateValueRecursive(obj[currentKey], keys.slice(1).join("."), newValue);
    }
  };

  const onNext = () => {
    if (!inputs.details) {
      setInputError("Description Code is required");
    }
    if (!inputs.qualification) {
      setInputError("Qualification Code is required");
    }
    if (!inputs.eirCode) {
      setInputError("EIR Code is required");
    }
    if (!inputs.telephone) {
      setInputError("Phone is required");
    }
    if (!inputs.addressLine1) {
      setInputError("Address is required");
    }

    if (
      !!inputs.addressLine1 &&
      !!inputs.telephone &&
      !!inputs.qualification &&
      !!inputs.eirCode &&
      !!inputs.details
    ) {
      setInputError("");
      setTab(2);
    }
  };

  const onDone = () => {
    if (level.length == 0) {
      setInputError("You must select a level");
    }
    if (!inputs.subjectInfo.subject) {
      setInputError("You must select a subject");
    }
    if (!inputs.tuitionType) {
      setInputError("You must select a tution type");
    }

    if (
      !!inputs.tuitionType &&
      !!inputs.subjectInfo.subject &&
      level.length != 0
    ) {
      setInputError("");
      let body = inputs;
      body.subjectInfo.level = level;
      console.log(JSON.stringify(body));
      dispatch(addTutorDetails(body));
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={20} />
        <Header
          title="Tutor Registration"
          subtitle="Provide the valid info to complete registration."
        />

        {tab === 1 && (
          <>
            <Text style={styles.subtitle}>1. Personal Details</Text>
            <Space height={10} />
            <View style={styles.progressBar}>
              <View style={styles.progressBar50}></View>
            </View>
            <Space height={25} />
            <Input
              placeholder="Address Line"
              iconName={locationIcon}
              onChangeText={(text) => handleOnchange(text, "addressLine1")}
            />
            <Input
              placeholder="Phone"
              iconName={callIcon}
              onChangeText={(text) => handleOnchange(text, "telephone")}
            />
            <Input
              placeholder="EIR Code"
              iconName={eirIcon}
              onChangeText={(text) => handleOnchange(text, "eirCode")}
            />
            <Input
              placeholder="Highest Qualification"
              iconName={teacherIcon}
              onChangeText={(text) => handleOnchange(text, "qualification")}
            />
            <Input
              placeholder="Who are you"
              iconName={mq}
              onChangeText={(text) => handleOnchange(text, "details")}
            />

            {!!inputError && <ErrorMessage message={inputError} />}

            <Button title="Next" onPress={() => onNext()} />
          </>
        )}

        {tab === 2 && (
          <>
            <Text style={styles.subtitle}>2. Subject Information</Text>
            <Space height={10} />
            <View style={styles.progressBar}>
              <View style={styles.progressBar100}></View>
            </View>
            <Space height={30} />
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleOnchange(!inputs?.freeClass, "freeClass")}
            >
              <Icon icon={inputs?.freeClass ? tickIconActive : tickIcon} l />
              <Text style={styles.freeClass}>
                The first class will be free.
              </Text>
            </TouchableOpacity>
            <Space height={30} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Select Tuton Type</Text>
            </View>
            <Space height={10} />

            <View style={styles.flexRow}>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  onPress={() =>
                    handleOnchange(
                      inputs?.tuitionType == "oneToOne" ? "" : "oneToOne",
                      "tuitionType"
                    )
                  }
                >
                  <Icon
                    icon={
                      inputs?.tuitionType == "oneToOne"
                        ? tickIconActive
                        : tickIcon
                    }
                    l
                  />
                </TouchableOpacity>
                <Text style={styles.levelText}>In Person</Text>
              </View>
              <View style={[styles.flexRow, { marginLeft: 20 }]}>
                <TouchableOpacity
                  onPress={() =>
                    handleOnchange(
                      inputs?.tuitionType == "online" ? "" : "online",
                      "tuitionType"
                    )
                  }
                >
                  <Icon
                    icon={
                      inputs?.tuitionType == "online"
                        ? tickIconActive
                        : tickIcon
                    }
                    l
                  />
                </TouchableOpacity>
                <Text style={styles.levelText}>Online</Text>
              </View>
            </View>
            <Space height={30} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Select Subject</Text>
            </View>
            <Space height={10} />

            <View style={styles.flexRow}>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  onPress={() =>
                    inputs.subjectInfo.subject == "Math"
                      ? updateInputs("subjectInfo.subject", "")
                      : updateInputs("subjectInfo.subject", "Math")
                  }
                >
                  <Icon
                    icon={
                      inputs.subjectInfo.subject == "Math"
                        ? tickIconActive
                        : tickIcon
                    }
                    l
                  />
                </TouchableOpacity>
                <Text style={styles.levelText}>Math</Text>
              </View>
              <View style={[styles.flexRow, { marginLeft: 20 }]}>
                <TouchableOpacity
                  onPress={() =>
                    inputs.subjectInfo.subject == "Physics"
                      ? updateInputs("subjectInfo.subject", "")
                      : updateInputs("subjectInfo.subject", "Physics")
                  }
                >
                  <Icon
                    icon={
                      inputs.subjectInfo.subject == "Physics"
                        ? tickIconActive
                        : tickIcon
                    }
                    l
                  />
                </TouchableOpacity>
                <Text style={styles.levelText}>Physics</Text>
              </View>
            </View>

            <Space height={30} />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.label, { marginRight: "50%" }]}>
                  Level
                </Text>
                <Text style={styles.label}>Price</Text>
              </View>

              <LevelPrice
                title={"Primary School"}
                onPress={() =>
                  level[0]?.name == "Primary School"
                    ? updateLevel(0, "")
                    : updateLevel(0, "Primary School")
                }
                iconName={
                  level[0]?.name == "Primary School" ? tickIconActive : tickIcon
                }
                setPrice={updatePrice}
                index={0}
              />
              <LevelPrice
                title={"Junior Cycle"}
                onPress={() =>
                  level[1]?.name == "Junior Cycle"
                    ? updateLevel(1, "")
                    : updateLevel(1, "Junior Cycle")
                }
                iconName={
                  level[1]?.name == "Junior Cycle" ? tickIconActive : tickIcon
                }
                setPrice={updatePrice}
                index={1}
              />
              <LevelPrice
                title={"Senior Cycle"}
                onPress={() =>
                  level[2]?.name == "Senior Cycle"
                    ? updateLevel(2, "")
                    : updateLevel(2, "Senior Cycle")
                }
                iconName={
                  level[2]?.name == "Senior Cycle" ? tickIconActive : tickIcon
                }
                setPrice={updatePrice}
                index={2}
              />
              <LevelPrice
                title={"University"}
                onPress={() =>
                  level[3]?.name == "University"
                    ? updateLevel(3, "")
                    : updateLevel(3, "University")
                }
                iconName={
                  level[3]?.name == "University" ? tickIconActive : tickIcon
                }
                setPrice={updatePrice}
                index={3}
              />
              <LevelPrice
                title={"Adult/Casual"}
                onPress={() =>
                  level[4]?.name == "Adult/Casual"
                    ? updateLevel(4, "")
                    : updateLevel(4, "Adult/Casual")
                }
                iconName={
                  level[4]?.name == "Adult/Casual" ? tickIconActive : tickIcon
                }
                setPrice={updatePrice}
                index={4}
              />
            </View>

            <Space height={10} />

            {!!inputError && <ErrorMessage message={inputError} />}

            <Button title="Done" onPress={() => onDone()} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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
});

export default TutorAddDetailsScreen;
