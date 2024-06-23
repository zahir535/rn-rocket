import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native";
import React, { useEffect } from "react";
import { centerHV, flexChild } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getPiData } from "../network";

export const BasePage = () => {
  const navigation = useNavigation();

  const { isPending, isError, data, error, refetch } = useQuery({ queryKey: ["piValues"], queryFn: getPiData });

  console.log(">>> data", data);

  const handleCalculatePi = () => {
    navigation.navigate("CalculatePiScreen");
  };

  const buttonStyle: ViewStyle = {
    ...centerHV,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: "#FFFED3",
    borderRadius: 4,
  };

  const pageStyle: ViewStyle = {
    ...flexChild,
    ...centerHV,
    backgroundColor: "white",
  };

  const piTextStyle: TextStyle = {
    fontSize: 18,
    fontWeight: "600",
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener("focus", () => {
      refetch();
    });

    return () => {
      onFocusListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  // todo - check if missed any requirements, scalability & enhancement or improvements

  if (isPending) {
    return (
      <View style={pageStyle}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={pageStyle}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={pageStyle}>
      <View>
        <Text>
          Nearest PI Value: <Text style={piTextStyle}>{data.data}</Text>
        </Text>
        <Text onPress={() => refetch()} style={{ fontSize: 12, marginTop: 12 }}>
          Refresh
        </Text>
      </View>

      <Pressable onPress={handleCalculatePi} style={buttonStyle}>
        <Text>Calculate Pi</Text>
      </Pressable>
    </View>
  );
};
