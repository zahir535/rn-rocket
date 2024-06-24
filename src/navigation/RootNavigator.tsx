import React, { Fragment, useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasePage, CalculatePiPage } from "../page";
import { GeneralContext } from "../context";
import { LoadingModal } from "../modal";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

export const RootNavigator = () => {
  const { contextState } = useContext(GeneralContext);

  return (
    <Fragment>
      <Navigator>
        <Screen name="BaseScreen" component={BasePage} />
        <Screen name="CalculatePiScreen" component={CalculatePiPage} />
      </Navigator>

      <LoadingModal isLoading={contextState.isLoading} />
    </Fragment>
  );
};
