import React from "react";
import "./App.css";
import QrCard from "./components/QrCard";
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import "./App.css";

function App() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          background: "#F3FAFC",
          center: "center",
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Container w="100%">
          <Header />
          <hr />
          <QrCard />
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
