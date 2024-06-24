/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native";
import React, { useEffect } from "react";
import { centerHV, flexChild } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getPiData } from "../network";
import { DIAMETER_OF_SUN } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";

export const BasePage = () => {
  const navigation = useNavigation();

  const { isPending, isError, data, error, refetch } = useQuery({ queryKey: ["piValues"], queryFn: getPiData });

  const handleCalculatePi = () => {
    navigation.navigate("CalculatePiScreen");
  };

  console.log(">>> data", JSON.stringify(data));

  const buttonStyle: ViewStyle = {
    ...centerHV,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: "#FFFED3",
    borderRadius: 4,
    width: "80%",
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

  const firstSectionStyle: ViewStyle = {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    width: "80%",
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

  const isValidData = data !== undefined && data.data !== undefined;
  const piValue = isValidData ? Math.round(data.data * 1000000) / 1000000 : 0;
  const circumferenceValue = isValidData ? Math.round(DIAMETER_OF_SUN * data.data * 1000000) / 1000000 : 0;

  return (
    <View style={pageStyle}>
      <View style={{ ...firstSectionStyle, flexDirection: "row", justifyContent: "space-between" }}>
        <Text>
          Nearest PI Value: <Text style={piTextStyle}>{piValue || 0}</Text>
        </Text>
        <View style={{ marginLeft: 8 }}>
          <Icon name="sync" size={24} color="#900" onPress={() => refetch()} />
        </View>
      </View>

      {isValidData && data.data > 0 && (
        <View style={firstSectionStyle}>
          <Text style={{ marginBottom: 12 }}>Circumference of the sun:</Text>
          <Text style={piTextStyle}>{circumferenceValue} KM</Text>
        </View>
      )}

      <Pressable onPress={handleCalculatePi} style={{ ...buttonStyle, marginTop: 42 }}>
        <Text>Go To Calculate Pi Page</Text>
      </Pressable>
    </View>
  );
};
