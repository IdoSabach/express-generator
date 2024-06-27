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

// Read func - Read Single Data
router.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Contact.findById(id)
      .then((contact) => {
        console.log(contact);
        res.status(200).json({ contact: contact });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "read error 3" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "read error 4" });
  }
});

//search func
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i");

    const contacts = await Contact.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { emailAddress: searchRegex },
      ],
    });

    if (contacts.length) {
      // console.log(contacts);
      res.status(200).json({ contacts: contacts });
    } else {
      res.status(200).json({ contacts: [], msg: "no match records find" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error searching contacts" });
  }
});

// Update contact by ID
router.put('/post/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateContact = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(id, updateContact, { new: true });

    if (updatedContact) {
      console.log(updatedContact);
      res.status(202).json({ msg: "Update successful", contact: updatedContact });
    } else {
      res.status(404).json({ msg: "Contact not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating contact" });
  }
});



module.exports = router;
