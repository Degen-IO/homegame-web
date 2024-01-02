import { useState } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import TestLogin from "./components/testLogin.jsx";
import { Home } from "./page/Home.jsx";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:3666/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </>
  );
}

export default App;
