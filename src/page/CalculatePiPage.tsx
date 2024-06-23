import { View, Text, ViewStyle, TextInput, Pressable, TextStyle } from "react-native";
import React, { Fragment, useContext, useState } from "react";
import { centerHV, flexChild } from "../styles";
import { Tag } from "../component";
import { calculatePi } from "../network";
import { useMutation } from "@tanstack/react-query";
import { GeneralContext } from "../context";

export const CalculatePiPage = () => {
  const [methodLists] = useState<piMethods[]>(["gregory", "limit"]);
  const [selectedMethod, setSelectedMethod] = useState<piMethods>("gregory");
  const [iteration, setIteration] = useState<string>("");
  const [bigNumber, setBigNumber] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const { contextState, handleContextState } = useContext(GeneralContext);

  const isGregory = selectedMethod === "gregory";
  const textInputValue = isGregory ? iteration : bigNumber;
  const onChangeInput = isGregory ? setIteration : setBigNumber;
  const inputPlaceHolder = isGregory ? "number of iteration (optional)" : "the big number (required)";

  const handleUpdateMethod = (value: piMethods) => {
    setSelectedMethod(value);
    setIteration("");
    setBigNumber("");
  };

  // Mutations
  const mutation = useMutation({
    mutationFn: calculatePi,
    onMutate: () => {
      handleContextState({ ...contextState, isLoading: true });
    },
    onSettled: () => {
      handleContextState({ ...contextState, isLoading: false });
      setIteration("");
      setBigNumber("");
    },
  });

  const handleCalculatePi = async () => {
    if (selectedMethod === "limit" && bigNumber !== "") {
      const theBigNumber = Number(bigNumber);
      const theBigNumberProps = typeof theBigNumber === "number" ? theBigNumber : undefined;
      mutation.mutate({ method: selectedMethod, bodyData: { bigNumber: theBigNumberProps } });
    }

    if (selectedMethod === "gregory") {
      const iterationNumber = Number(iteration);
      const iterationProps = typeof iterationNumber === "number" ? iterationNumber : undefined;
      mutation.mutate({ method: selectedMethod, bodyData: { iteration: iterationProps } });
    }
  };

  const pageStyle: ViewStyle = {
    ...flexChild,
    ...centerHV,
    backgroundColor: "white",
  };

  const inputStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 12,
    width: "80%",
  };

  const buttonStyle: ViewStyle = {
    ...centerHV,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: isPressed ? "#4C3BCF" : "#B1AFFF",
    borderRadius: 4,
    width: "80%",
  };

  const buttonTextStyle: TextStyle = {
    color: isPressed ? "white" : "black",
  };

  return (
    <View style={pageStyle}>
      <Text>Select Your Calculation Method:</Text>
      <Tag tagLists={methodLists} selectedTag={selectedMethod} updateSelectedTag={handleUpdateMethod} />

      <Fragment>
        <TextInput
          keyboardType={"decimal-pad"}
          onChangeText={onChangeInput}
          placeholder={inputPlaceHolder}
          style={inputStyle}
          value={textInputValue}
        />
        <Pressable
          onPress={handleCalculatePi}
          style={buttonStyle}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}>
          <Text style={buttonTextStyle}>Calculate Pi</Text>
        </Pressable>
      </Fragment>
    </View>
  );
};
