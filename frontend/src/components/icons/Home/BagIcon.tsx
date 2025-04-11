import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  focused: boolean;
  activeColor: string;
  inActiveColor: string;
};
const BagIcon = ({ focused, activeColor, inActiveColor }: Props) => (
  <Svg width={27} height={27} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.5 7.66952V6.69952C7.5 4.44952 9.31 2.23952 11.56 2.02952C14.24 1.76952 16.5 3.87952 16.5 6.50952V7.88952"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.4955 12H15.5045"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.49451 12H8.50349"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BagIcon;
