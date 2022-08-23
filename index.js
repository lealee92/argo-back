const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// création serveur
const app = express();
app.use(formidable());
app.use(cors());

// connexion à la BDD
mongoose.connect(process.env.MONGODB_URI);
// déclaration du modèle
const Member = mongoose.model("Member", {
  name: {
    type: String,
    default: "",
  },
});

// create
app.post("/create", async (req, res) => {
  console.log("route: /create");
  console.log(req.fields.name);
  try {
    const newMember = new Member({
      name: req.fields.name,
    });
    await newMember.save();
    res.json({ message: "Welcome to", name: newMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// read
app.get("/", async (req, res) => {
  console.log("route: /");
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});
