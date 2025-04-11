import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const NotificationIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 36}
    height={props.height ?? 36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#231F20" />
    <Path
      d="M18.02 8.91016C14.71 8.91016 12.02 11.6002 12.02 14.9102V17.8002C12.02 18.4102 11.76 19.3402 11.45 19.8602L10.3 21.7702C9.59 22.9502 10.08 24.2602 11.38 24.7002C15.69 26.1402 20.34 26.1402 24.65 24.7002C25.86 24.3002 26.39 22.8702 25.73 21.7702L24.58 19.8602C24.28 19.3402 24.02 18.4102 24.02 17.8002V14.9102C24.02 11.6102 21.32 8.91016 18.02 8.91016Z"
      stroke="#FCFCFC"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M19.87 9.20043C19.56 9.11043 19.24 9.04043 18.91 9.00043C17.95 8.88043 17.03 8.95043 16.17 9.20043C16.46 8.46043 17.18 7.94043 18.02 7.94043C18.86 7.94043 19.58 8.46043 19.87 9.20043Z"
      stroke="#FCFCFC"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.02 25.0596C21.02 26.7096 19.67 28.0596 18.02 28.0596C17.2 28.0596 16.44 27.7196 15.9 27.1796C15.36 26.6396 15.02 25.8796 15.02 25.0596"
      stroke="#FCFCFC"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default NotificationIcon;
