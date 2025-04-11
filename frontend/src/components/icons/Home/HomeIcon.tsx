import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  focused: boolean;
  activeColor: string;
  inActiveColor: string;
};
const HomeIcon = ({ focused, activeColor, inActiveColor }: Props) => (
  <Svg width={25} height={25} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7.02 0.840162L1.63 5.04016C0.73 5.74016 0 7.23016 0 8.36016V15.7702C0 18.0902 1.89 19.9902 4.21 19.9902H15.79C18.11 19.9902 20 18.0902 20 15.7802V8.50016C20 7.29016 19.19 5.74016 18.2 5.05016L12.02 0.720163C10.62 -0.259837 8.37 -0.209837 7.02 0.840162Z"
      fill={focused ? activeColor : inActiveColor}
    />
    <Path
      d="M10 13V16"
      stroke={focused ? inActiveColor : activeColor}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default HomeIcon;
