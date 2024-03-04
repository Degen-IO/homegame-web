import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Clubdetail, Gamedetail, CreateGame } from "./page";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:3666/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("id_token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club/:clubId" element={<Clubdetail />} />
          <Route
            path="/club/:clubId/:typeName/:gameId"
            element={<Gamedetail />}
          />
          <Route exact path="/:groupId/create-game" element={<CreateGame />} />

          {/* Remove the standalone Home component */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
