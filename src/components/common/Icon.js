import { Image } from "react-native";

const Icon = ({ icon, large, xl }) => {
  return (
    <Image
      source={icon}
      style={[
        { width: 14, height: 14, resizeMode: "contain" },
        large && { width: 18, height: 18 },
        xl && { width: 24, height: 24 },
      ]}
    />
  );
};

export default Icon;
