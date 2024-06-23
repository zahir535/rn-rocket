import { View, Text, ViewStyle } from "react-native";
import React from "react";
import { absolutePosition, centerHV, flexChild } from "../styles";

export const Loading = () => {
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
    <View style={loadingPageStyle}>
      <Text>Loading ...</Text>
    </View>
  );
};
