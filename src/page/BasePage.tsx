import { View, Text, Pressable, ViewStyle, TextStyle, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { centerHV, flexChild } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getPiData } from "../network";
import { BasicModal } from "../modal";
import { GeneralContext } from "../context";

export const BasePage = () => {
  const navigation = useNavigation();
  const [diameter, setDiameter] = useState("");
  const [circumference, setCircumference] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { contextState, handleContextState } = useContext(GeneralContext);

  const { isPending, isError, data, error, refetch } = useQuery({ queryKey: ["piValues"], queryFn: getPiData });

  const handleCalculatePi = () => {
    navigation.navigate("CalculatePiScreen");
  };

  const handleCalculateCircumference = () => {
    const diameterNumber = Number(diameter); // todo - if type in char, it becomes NaN, but type is still number
    const diameterNumberValue = typeof diameterNumber === "number" && diameterNumber >= 0 ? diameterNumber : 0;

    const calculatedValue = diameterNumberValue * data.data;
    const roundedCircumference = Math.round(calculatedValue * 100) / 100;
    setCircumference(roundedCircumference.toString());

    return roundedCircumference.toString();
  };

  const onCalculateCircumference = async () => {
    handleContextState({ ...contextState, isLoading: true });
    const res = await handleCalculateCircumference();

    if (typeof res === "string" && res !== "") {
      setDiameter("");
      setShowModal(true);
    }
    handleContextState({ ...contextState, isLoading: false });
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

  const pageStyle: ViewStyle = {
    ...flexChild,
    ...centerHV,
    backgroundColor: "white",
  };

  const piTextStyle: TextStyle = {
    fontSize: 18,
    fontWeight: "600",
  };

  const inputStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 12,
    width: "80%",
    marginTop: 8,
  };

  const firstSectionStyle: ViewStyle = {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
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

  return (
    <View style={pageStyle}>
      <View style={firstSectionStyle}>
        <Text>
          Nearest PI Value: <Text style={piTextStyle}>{data.data}</Text>
        </Text>
        <Text onPress={() => refetch()} style={{ fontSize: 12, marginTop: 12 }}>
          Refresh
        </Text>
      </View>

      <Text>Calculate Sun's circumference:</Text>

      <TextInput
        keyboardType={"decimal-pad"}
        onChangeText={setDiameter}
        placeholder={"sun's diameter (km)"}
        style={inputStyle}
        value={diameter}
      />
      <Pressable
        onPress={onCalculateCircumference}
        style={{ ...buttonStyle, backgroundColor: "transparent", borderWidth: 1, borderRadius: 8 }}>
        <Text>Calculate Circumference</Text>
      </Pressable>

      <Pressable onPress={handleCalculatePi} style={{ ...buttonStyle, marginTop: 42 }}>
        <Text>Go To Calculate Pi Page</Text>
      </Pressable>

      <BasicModal
        isShowModal={showModal}
        onCLose={() => setShowModal(false)}
        title={"Circumference of the sun is:"}
        subtitle={`${circumference} KM`}
      />
    </View>
  );
};
