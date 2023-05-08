import { Image } from "react-native";

const Icon = ({ icon, l, xl }) => {
  return (
    <Image
      source={icon}
      style={[
        { width: 12, height: 12, resizeMode: "contain" },
        l && { width: 20, height: 20 },
        xl && { width: 24, height: 24 },
      ]}
    />
  );
};

export default Icon;
