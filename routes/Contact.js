const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// create *C*rud
///contact/post
router.post("/post", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    console.log(savedContact);
    res.status(201).json({ msg: "Contact successfully saved" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.emailAddress) {
      res.status(500).json({ msg: "Unable to create new Contact Same Data" });
    } else {
      res.status(500).json({ msg: "Unable to create new Contact" });
    }
  }
});

// Read c*R*ud ***Read All Date
router.get("/post", async (req, res) => {
  try {
    Contact.find()
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "read error 1" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "read error 2" });
  }
});

module.exports = router;
