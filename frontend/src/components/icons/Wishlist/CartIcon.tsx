import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CartIcon = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 20 21" fill="none" {...props}>
    <Path
      d="M3.75397 5.29134C7.80657 3.98286 12.5546 3.68272 14.6667 3.72884C16.7788 3.77496 17.67 4.52707 18.3125 5.81217C19.3542 7.89551 19.1344 13.0914 17.2709 14.7571C15.4084 16.4227 7.71894 16.581 5.15644 14.7571C2.44915 12.8289 3.86358 7.57467 3.77504 3.98197C3.82817 1.97155 1.64587 1.64551 1.64587 1.64551"
      stroke="#231F20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.5417 8.93685H14.4303"
      stroke="#231F20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.56664 18.9658C5.87914 18.9658 6.13331 19.22 6.13331 19.5325C6.13331 19.846 5.87914 20.1002 5.56664 20.1002C5.2531 20.1002 4.99893 19.846 4.99893 19.5325C4.99893 19.22 5.2531 18.9658 5.56664 18.9658Z"
      fill="#231F20"
      stroke="#231F20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.3286 18.9658C16.6422 18.9658 16.8963 19.22 16.8963 19.5325C16.8963 19.846 16.6422 20.1002 16.3286 20.1002C16.0161 20.1002 15.762 19.846 15.762 19.5325C15.762 19.22 16.0161 18.9658 16.3286 18.9658Z"
      fill="#231F20"
      stroke="#231F20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CartIcon;
