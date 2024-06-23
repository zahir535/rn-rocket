import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasePage, CalculatePiPage } from "../page";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

export const RootNavigator = () => {
  return (
    <Navigator>
      <Screen name="BaseScreen" component={BasePage} />
      <Screen name="CalculatePiScreen" component={CalculatePiPage} />
    </Navigator>
  );
};
