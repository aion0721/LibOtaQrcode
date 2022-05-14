import React from "react";
import "./App.css";
import QrCard from "./components/QrCard";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <QrCard />
      </div>
    </ChakraProvider>
  );
}

export default App;
