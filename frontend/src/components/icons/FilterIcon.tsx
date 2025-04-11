import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const FilterIcon = (props: SvgProps) => (
  <Svg
    width={44}
    height={44}
    viewBox="0 0 44 44"
    fill="none"
    {...props}
  >
    <Circle cx={22} cy={22} r={22} fill="#231F20" />
    <Path
      d="M24 18C24 20.2091 25.7909 22 28 22C30.2091 22 32 20.2091 32 18C32 15.7909 30.2091 14 28 14C25.7909 14 24 15.7909 24 18ZM12 18.75H28V17.25H12V18.75Z"
      fill="#FCFCFC"
    />
    <Path
      d="M20 26C20 28.2091 18.2091 30 16 30C13.7909 30 12 28.2091 12 26C12 23.7909 13.7909 22 16 22C18.2091 22 20 23.7909 20 26ZM32 26.75H16V25.25H32V26.75Z"
      fill="#FCFCFC"
    />
  </Svg>
);
export default FilterIcon;
