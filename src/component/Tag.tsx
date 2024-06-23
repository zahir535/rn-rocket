import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { FunctionComponent } from "react";

interface TagProps {
  tagLists: piMethods[];
  selectedTag: piMethods;
  updateSelectedTag: (piMethods) => void;
}

export const Tag: FunctionComponent<TagProps> = ({ tagLists, selectedTag, updateSelectedTag }) => {
  const TagComponentStyle: ViewStyle = {
    width: "100%",
    paddingHorizontal: 24,
    marginVertical: 24,
  };

  const TagItemStyle: ViewStyle = {
    width: "auto",
    paddingHorizontal: 4,
    paddingVertical: 2,
  };

  return (
    <View style={TagComponentStyle}>
      {tagLists.map((eachTag, index) => {
        const isSelected = eachTag === selectedTag;

        const handleUpdateSelectedTag = () => {
          updateSelectedTag(eachTag);
        };

        return (
          <Pressable
            key={`${eachTag}-${index}`}
            // eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
            style={{ ...TagItemStyle, backgroundColor: isSelected ? "#F9D689" : "#FFFED3" }}
            onPress={handleUpdateSelectedTag}>
            <Text>{eachTag}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
