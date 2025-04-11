import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  focused: boolean;
  activeColor: string;
  inActiveColor: string;
};
const ChatIcon = ({ focused, activeColor, inActiveColor }: Props) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
    <Path
      d="M8.85418 19.7923H8.33334C4.16668 19.7923 2.08334 18.7507 2.08334 13.5423V8.33398C2.08334 4.16732 4.16668 2.08398 8.33334 2.08398H16.6667C20.8333 2.08398 22.9167 4.16732 22.9167 8.33398V13.5423C22.9167 17.709 20.8333 19.7923 16.6667 19.7923H16.1458C15.8229 19.7923 15.5104 19.9486 15.3125 20.209L13.75 22.2923C13.0625 23.209 11.9375 23.209 11.25 22.2923L9.68751 20.209C9.52084 19.9798 9.13543 19.7923 8.85418 19.7923Z"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.25}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.29166 8.33398H17.7083"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.29166 13.541H13.5417"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ChatIcon;
