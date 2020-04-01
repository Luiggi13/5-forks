import React from 'react';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from "./app/utils/Firebase";
import { YellowBox } from "react-native";
// console.disableYellowBox = true;
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}