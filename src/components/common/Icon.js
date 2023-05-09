import { Image } from "react-native";

const Icon = ({ icon, l, xl, xs, xxl }) => {
  return (
    <Image
      source={icon}
      style={[
        { width: 12, height: 12, resizeMode: "contain" },
        l && { width: 20, height: 20 },
        xl && { width: 24, height: 24 },
        xxl && { width: 50, height: 50 },
        xs && { width: 6, height: 6 },
      ]}
    />
  );
};

export default Icon;
