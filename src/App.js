import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleMap from "./SimpleMap";
import MapForPostal from "./map-postal";
const App = () => {
  return (
    <div>
      <h2>Search by complete address</h2>
      <SimpleMap />
      <hr />
      <h2>Search by postal code</h2>
      <MapForPostal />
    </div>
  );
};
export default App;
