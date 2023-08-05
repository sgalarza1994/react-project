import React,{useEffect} from 'react';
import Navigation from './app/navigations/Navigation';
import {firebaseApp} from './app/utils/firebase_config'
import {LogBox} from 'react-native'

LogBox.ignoreLogs(["Setting a timer"])


export default function App() {
  
  
  return (
    <Navigation />
  );
}