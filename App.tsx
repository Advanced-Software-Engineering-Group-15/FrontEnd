import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import Login from './pages/login';

//what is returned on screen
export default function App() {

  return (
    <NativeRouter>
      <Routes>
          <Route path="/" element={< Login />} /> 
      </Routes>
    </NativeRouter>
  );
};

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});