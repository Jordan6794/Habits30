import './App.css';
import Table from "./Table.js";

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const uri = "";

// mongoose.connect(uri, {useNewUrlParser: true});

// const habbitSchema = new mongoose.Schema({
//   name: String,
//   id: String
// });

// const Habbit = mongoose.model("Habbit", habbitSchema);
// const habbitTest = new Habbit({name: "Habbit 1", id: "202"});

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Habits</h1>
      </header>
      <Table />
    </div>
  );
}

export default App;
