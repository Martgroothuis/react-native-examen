import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";

import HomeScreen from "./Components/HomeScreen"
import CameraScreen from "./Components/CameraScreen"
import ImageScreen from "./Components/ImageScreen"
import FormScreen from "./Components/FormScreen"
import HistoryScreen from "./Components/HistoryScreen"


const AppNavigator = createStackNavigator(
    {
        "Home": HomeScreen,
        "Camera": CameraScreen,
        "Image": ImageScreen,
        "Form": FormScreen,

        "History": HistoryScreen,
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);