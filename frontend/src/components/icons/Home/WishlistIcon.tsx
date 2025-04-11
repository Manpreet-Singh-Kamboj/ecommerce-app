import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  focused: boolean;
  activeColor: string;
  inActiveColor: string;
};
const WishlistIcon = ({ focused, activeColor, inActiveColor }: Props) => (
  <Svg width={27} height={27} viewBox="0 0 26 26" fill="none">
    <Path
      d="M13.6717 22.5433C13.3033 22.6733 12.6967 22.6733 12.3283 22.5433C9.18666 21.4708 2.16666 16.9966 2.16666 9.41326C2.16666 6.06576 4.86416 3.35742 8.18999 3.35742C10.1617 3.35742 11.9058 4.31076 13 5.78409C14.0942 4.31076 15.8492 3.35742 17.81 3.35742C21.1358 3.35742 23.8333 6.06576 23.8333 9.41326C23.8333 16.9966 16.8133 21.4708 13.6717 22.5433Z"
      stroke={focused ? activeColor : inActiveColor}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default WishlistIcon;
