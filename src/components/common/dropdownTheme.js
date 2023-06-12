import { StyleSheet } from "react-native";

import { Color } from "../../const/color";

export const ICONS = {
  ARROW_DOWN: require("../../../assets/images/arrow-up.png"),
  ARROW_UP: require("../../../assets/images/arrow-down.png"),
  TICK: require("../../../assets/images/tick.png"),
  CLOSE: require("../../../assets/images/close-circle-gray.png"),
};

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  style: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.BLACK,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: Color.WHITE,
  },
  label: {
    flex: 1,
    color: Color.dark1,
    fontSize: 16,
    fontFamily: "sofia-light",
    lineHeight: 18,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  tickIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  badgeStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Color.ALTO,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 8,
    backgroundColor: Color.GREY,
  },
  badgeSeparator: {
    width: 5,
  },
  listBody: {
    height: "100%",
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  dropDownContainer: {
    position: "absolute",
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    width: "100%",
    overflow: "hidden",
  },
  modalContentContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: Color.primarylight,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  listItemLabel: {
    flex: 1,
    color: Color.dark1,
    fontSize: 16,
    fontFamily: "sofia-medium",
    lineHeight: 26,
  },
  iconContainer: {
    marginRight: 10,
  },
  arrowIconContainer: {
    marginLeft: 10,
  },
  tickIconContainer: {
    marginLeft: 10,
  },
  closeIconContainer: {
    marginLeft: 10,
  },
  listParentLabel: {},
  listChildLabel: {},
  listParentContainer: {},
  listChildContainer: {
    paddingLeft: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: Color.BLACK,
    borderBottomWidth: 1,
  },
  searchTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: Color.BLACK,
    borderWidth: 1,
    color: Color.BLACK,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Color.BLACK,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  customItemContainer: {},
  customItemLabel: {
    fontStyle: "italic",
    fontFamily: "sofia-bold",
    fontSize: 22,
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  listMessageText: {},
  selectedItemContainer: {},
  selectedItemLabel: {},
  modalTitle: {
    fontSize: 18,
    color: Color.BLACK,
  },
  extendableBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  extendableBadgeItemContainer: {
    marginVertical: 3,
    marginEnd: 7,
  },
});
