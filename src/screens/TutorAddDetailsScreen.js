import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import Space from "../components/common/Space";
import Header from "../components/Auth/Header";
import { useCallback, useEffect, useState } from "react";
import Input from "../components/Auth/Input";
import Button from "../components/common/Button";
import { Color } from "../const/color";
import Icon from "../components/common/Icon";
import DropDownPicker from "react-native-dropdown-picker";
import ErrorMessage from "../components/common/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { addTutorDetails, getSubject, searchTutor } from "../api/tutor";
import { clearError, clearRes, subjects } from "../store/tutorSlice";
import { useNavigation } from "@react-navigation/native";
import LevelPrice from "../components/Profile/LevelPrice";
import AddSubject from "../components/Profile/AddSubject";
import { getMe } from "../api/auth";

const locationIcon = require("../../assets/images/location.png");
const callIcon = require("../../assets/images/call-calling.png");
const eirIcon = require("../../assets/images/zip-code.png");
const teacherIcon = require("../../assets/images/teacher.png");
const mq = require("../../assets/images/mq.png");
const bookIcon = require("../../assets/images/book.png");
const tickIcon = require("../../assets/images/tick-square.png");
const tickIconActive = require("../../assets/images/tick-square-active.png");
const closeIcon = require("../../assets/images/close-circle.png");

const myTheme = require("../components/common/dropdownTheme");

DropDownPicker.addTheme("Tutorro", myTheme);
DropDownPicker.setTheme("Tutorro");

const TutorAddDetailsScreen = () => {
  const [tab, setTab] = useState(1);
  const [inputError, setInputError] = useState("");
  const [inputs, setInputs] = useState({
    addressLine1: "",
    telephone: "",
    country: "Ireland",
    eirCode: "",
    qualification: "",
    description: "",
    tuitionType: "",
    freeFirstClass: false,
  });

  const defaultSubjectInfo = {
    subject: "Math",
    level: [
      {
        name: "Primary School",
        price: 25.0,
      },
      {
        name: "Junior Cycle",
        price: 25.0,
      },
      {
        name: "Adult/Casual",
        price: 25.0,
      },
    ],
  };

  const [subjectInfo, setSubjectInfo] = useState([
    {
      subject: "Math",
      level: [
        {
          name: "",
          price: 20,
        },
        {
          name: "",
          price: 20,
        },
        {
          name: "Adult/Casual",
          price: 20,
        },
      ],
    },
  ]);

  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState();
  const types = [
    { label: "In Person", value: "oneToOne" },
    { label: "Online", value: "online" },
    { label: "Both", value: "both" },
  ];

  const [qualificationOpen, setQualificaitonOpen] = useState(false);
  const [qualificationValue, setQualificationValue] = useState();
  const qualifications = [
    { label: "Bachelor", value: "Bachelor" },
    { label: "Master", value: "Master" },
    { label: "PhD", value: "PhD" },
  ];

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsValue, setDetailsValue] = useState();
  const whoAreYou = [
    { label: "Student", value: "Student" },
    { label: "Professional", value: "Professional" },
  ];

  const onQualificationOpen = () =>
    useCallback(() => {
      setDetailsOpen(false);
    }, []);

  const onDetailsOpen = () =>
    useCallback(() => {
      setQualificaitonOpen(false);
    }, []);

  const dispatch = useDispatch();

  //Navigation
  const navigation = useNavigation();

  const error = useSelector((state) => state.tutor.error);
  const res = useSelector((state) => state.tutor.res);
  const status = useSelector((state) => state.tutor.status);
  const allSubject = useSelector((state) => state.tutor.subject);
  const subjectObj = useSelector((state) => state.tutor.subjectObj);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleAddSubject = () => {
    setSubjectInfo([...subjectInfo, defaultSubjectInfo]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubject = subjectInfo.filter((_, i) => i !== index);
    setSubjectInfo(updatedSubject);
  };

  const updateSubject = (x, subject) => {
    const updatedSubject = [...subjectInfo];
    updatedSubject[x].subject = subject;
    setSubjectInfo(updatedSubject);
  };

  const updateLevel = (x, y, newName) => {
    const updatedLevels = [...subjectInfo];
    updatedLevels[x].level[y].name = newName;
    setSubjectInfo(updatedLevels);
  };

  const updatePrice = (x, y, newPrice) => {
    const updatedPrice = [...subjectInfo];
    updatedPrice[x].level[y].price = newPrice;
    setSubjectInfo(updatedPrice);
  };

  const onNext = () => {
    if (!inputs.description) {
      setInputError("Description is required");
    }
    if (!detailsValue) {
      setInputError("Who Are You is required");
    }
    if (!qualificationValue) {
      setInputError("Qualification is required");
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
      !!inputs.eirCode &&
      !!detailsValue &&
      !!qualificationValue &&
      !!inputs.description
    ) {
      setInputError("");
      setTab(2);
    }
  };

  const onDone = () => {
    let body = inputs;
    body.subjectInfo = subjectInfo;
    body.tuitionType = typeValue;
    body.whoAreYou = detailsValue;
    body.qualification = qualificationValue;

    const count = subjectInfo.reduce((acc, obj) => {
      acc[obj.subject] = (acc[obj.subject] || 0) + 1;
      return acc;
    }, {});

    const duplicates = Object.keys(count).filter(
      (subject) => count[subject] > 1
    );

    if (!inputs.tuitionType) {
      setInputError("You must select a tution type");
    }

    if (duplicates.length > 0) {
      setInputError(`You have selected ${duplicates} multiple times`);
    }

    if (!!inputs.tuitionType && duplicates.length == 0) {
      setInputError("");
      console.log(JSON.stringify(body));
      dispatch(addTutorDetails(body));
    }
  };

  useEffect(() => {
    if (res == "Tutor details added successfully") {
      dispatch(clearError());
      dispatch(clearRes());
      navigation.navigate("Confirmation");
    }
  }, [res]);

  useEffect(() => {
    if (allSubject == null) {
      dispatch(getSubject());
    }
  }, [allSubject]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <StatusBar />
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
              value={inputs.addressLine1}
            />
            <Input
              placeholder="Phone"
              iconName={callIcon}
              onChangeText={(text) => handleOnchange(text, "telephone")}
              value={inputs.telephone}
            />
            <Input
              placeholder="EIR Code"
              iconName={eirIcon}
              onChangeText={(text) => handleOnchange(text, "eirCode")}
              value={inputs.eirCode}
            />
            <View style={{ zIndex: 20 }}>
              <DropDownPicker
                open={qualificationOpen}
                value={qualificationValue}
                items={qualifications}
                onOpen={onQualificationOpen}
                setOpen={setQualificaitonOpen}
                setValue={setQualificationValue}
                dropDownContainerStyle={styles.dropdown}
                style={styles.dropdownPicker}
                placeholder="Highest Qualification"
              />
            </View>

            <Space height={20} />

            <View style={{ zIndex: 10 }}>
              <DropDownPicker
                open={detailsOpen}
                value={detailsValue}
                items={whoAreYou}
                onOpen={onDetailsOpen}
                setOpen={setDetailsOpen}
                setValue={setDetailsValue}
                dropDownContainerStyle={styles.dropdown}
                style={styles.dropdownPicker}
                placeholder="Who are you"
              />
            </View>

            <Space height={20} />

            <Input
              placeholder="Description"
              iconName={bookIcon}
              onChangeText={(text) => handleOnchange(text, "description")}
              value={inputs.description}
              multiline
            />

            {!!inputError && <ErrorMessage message={inputError} />}

            <Button title="Next" onPress={() => onNext()} />
          </>
        )}

        {tab === 2 && (
          <>
            <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
              <Text style={styles.subtitle}>2. Subject Information</Text>
              <TouchableOpacity
                onPress={() => setTab(1)}
                style={styles.prevBtn}
              >
                <Text style={styles.prevText}>Previous</Text>
              </TouchableOpacity>
            </View>

            <Space height={10} />
            <View style={styles.progressBar}>
              <View style={styles.progressBar100}></View>
            </View>
            <Space height={30} />
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() =>
                handleOnchange(!inputs?.freeFirstClass, "freeFirstClass")
              }
            >
              <Icon
                icon={inputs?.freeFirstClass ? tickIconActive : tickIcon}
                l
              />
              <Text style={styles.freeClass}>
                The first class will be free.
              </Text>
            </TouchableOpacity>
            <Space height={20} />

            <View style={{ zIndex: 10 }}>
              <DropDownPicker
                open={typeOpen}
                value={typeValue}
                items={types}
                setOpen={setTypeOpen}
                setValue={setTypeValue}
                dropDownContainerStyle={styles.dropdown}
                style={styles.dropdownPicker}
                placeholder="How you want to teach"
              />
            </View>

            <Space height={10} />

            {subjectObj != null && (
              <KeyboardAvoidingView behavior="padding" enabled>
                {subjectInfo.map((item, index) => (
                  <AddSubject
                    key={index}
                    i={index}
                    onRemove={handleRemoveSubject}
                    data={item}
                    updateLevel={updateLevel}
                    updatePrice={updatePrice}
                    updateSubject={updateSubject}
                    subject={subjectObj}
                  />
                ))}
              </KeyboardAvoidingView>
            )}

            {subjectInfo.length <= 7 && (
              <TouchableOpacity
                style={[
                  styles.prevBtn,
                  {
                    width: "30%",
                    alignSelf: "center",
                    marginTop: 20,
                    height: 40,
                    justifyContent: "center",
                  },
                ]}
                onPress={handleAddSubject}
              >
                <Text style={[styles.prevText, { textAlign: "center" }]}>
                  + Add Subject
                </Text>
              </TouchableOpacity>
            )}

            <Space height={10} />
            {!!inputError && <ErrorMessage message={inputError} />}
            {error?.message && <ErrorMessage message={error?.message} />}

            <Button title="Done" status={status} onPress={() => onDone()} />
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
  prevBtn: {
    backgroundColor: Color.primarylight,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  prevText: {
    fontSize: 12,
    color: Color.dark1,
    fontFamily: "sofia-light",
    lineHeight: 16,
  },
});

export default TutorAddDetailsScreen;
