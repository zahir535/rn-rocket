import { View, Text, ViewStyle } from "react-native";
import React, { Fragment, FunctionComponent } from "react";
import { flexChild, centerHV, absolutePosition } from "../styles";

interface LoadingModalProps {
  isLoading: boolean;
}

export const LoadingModal: FunctionComponent<LoadingModalProps> = ({ isLoading }) => {
  const loadingPageStyle: ViewStyle = {
    ...flexChild,
    ...centerHV,
    ...absolutePosition,
    backgroundColor: "#9bc0db",
    opacity: 0.8,
    height: "100%",
    width: "100%",
  };

  return (
    <Fragment>
      {isLoading && (
        <View style={loadingPageStyle}>
          <Text>Loading ...</Text>
        </View>
      )}
    </Fragment>
  );
};
