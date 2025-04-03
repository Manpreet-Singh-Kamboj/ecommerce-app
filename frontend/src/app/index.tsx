import { Redirect } from "expo-router";
import React from "react";

type Props = {};

const RootPage = (props: Props) => {
  return <Redirect href="welcome" />;
};

export default RootPage;
