import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import { io } from "socket.io-client";

// Components
import MainStack from "./src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logIn } from "./src/store/authSlice";
import { getMe } from "./src/api/auth";
import { getSubject } from "./src/api/tutor";
import { socketBaseURL } from "./src/config/baseURL";
import {
  messageRequestStatusChanged,
  newMessageReceived,
} from "./src/store/inboxSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

AsyncStorage.getItem("TOKEN").then((token) => {
  if (token) {
    const socket = io(socketBaseURL, {
      auth: {
        socketAuthToken: token,
      },
    });

    console.log("Token: " + token);

    socket.on("ON_MESSAGE_RECEIVED", (message) => {
      store.dispatch(newMessageReceived(message));

      if (store.getState().inbox.selectedRouteId == message.routeId)
        socket.emit("MESSAGE_SEEN", message.routeId);
    });

    socket.on("MESSAGE_REQUEST_STATUS_CHANGED", (routeId, status) => {
      store.dispatch(
        messageRequestStatusChanged({
          routeId,
          status,
        })
      );
    });
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "sofia-medium": require("./assets/fonts/SofiaMedium.otf"),
          "sofia-light": require("./assets/fonts/SofiaLight.otf"),
          "sofia-regular": require("./assets/fonts/SofiaRegular.otf"),
          "sofia-bold": require("./assets/fonts/SofiaBold.otf"),
          "sofia-semi-bold": require("./assets/fonts/SofiaSemiBold.otf"),
        });

        const value = await AsyncStorage.getItem("TOKEN");
        if (value) {
          dispatch(logIn());
          dispatch(getMe());
          dispatch(getSubject());
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView()}>
      <MainStack />
    </NavigationContainer>
  );
};
