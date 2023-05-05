import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";

// Components
import HomeScreen from "./src/screens/HomeScreen";
import TabNav from "./src/navigation/TabNav";
import MainStack from "./src/navigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "sofia-medium": require("./assets/fonts/SofiaMedium.otf"),
          "sofia-light": require("./assets/fonts/SofiaLight.otf"),
          "sofia-regular": require("./assets/fonts/SofiaRegular.otf"),
          "sofia-bold": require("./assets/fonts/SofiaBold.otf"),
        });
        console.log("4");
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        console.log("3");
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("2");

      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log("1");
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView()}>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
