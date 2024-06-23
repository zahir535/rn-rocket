import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { flexChild } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={flexChild}>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
          <RootNavigator />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
