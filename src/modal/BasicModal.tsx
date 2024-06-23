import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { Fragment, FunctionComponent } from "react";
import { flexChild, centerHV, absolutePosition } from "../styles";

interface BasicModalProps {
  isShowModal: boolean;
  onCLose: () => void;
  title: string;
  subtitle?: string;
}

export const BasicModal: FunctionComponent<BasicModalProps> = ({ isShowModal, onCLose, title, subtitle }) => {
  const modalStyle: ViewStyle = {
    ...flexChild,
    ...centerHV,
    ...absolutePosition,
    backgroundColor: "gray",
    height: "100%",
    width: "100%",
  };

  const contentStyle: ViewStyle = {
    // ...flexChild,
    borderRadius: 8,
    ...centerHV,
    backgroundColor: "white",
    height: "50%",
    width: "80%",
  };

  const buttonStyle: ViewStyle = {
    ...centerHV,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: "#FFFED3",
    borderRadius: 4,
    width: "80%",
  };

  return (
    <Fragment>
      {isShowModal && (
        <View style={modalStyle}>
          <View style={contentStyle}>
            <Text>{title}</Text>
            <View style={{ marginBottom: 24 }} />
            <Text>{subtitle}</Text>

            <Pressable onPress={onCLose} style={buttonStyle}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Fragment>
  );
};
