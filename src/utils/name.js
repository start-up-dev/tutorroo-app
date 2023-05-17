const getFullName = (firstName = "", lastName = "") => {
  if (firstName == "" && lastName == "") {
    return "N/A";
  } else if (firstName != "" && lastName != "") {
    return `${firstName} ${lastName}`;
  } else if (firstName != "") {
    return firstName;
  } else {
    return lastName;
  }
};

module.exports = getFullName;
