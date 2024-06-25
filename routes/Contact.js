const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    console.log(savedContact);
    res.status(201).json({ msg: "Contact successfully saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unable to create new Contact" });
  }
});

module.exports = router;
