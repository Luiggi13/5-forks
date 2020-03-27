import React from 'react';
import Navigation from './app/navigations/Navigation';
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}