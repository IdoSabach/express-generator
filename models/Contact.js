const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required: [true, "First name is require"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: (value) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(value)
      },
      message: "First name must container only alphabetic chars"
    }
  },
  lastName: {
    type:String,
    required: true,
  },
  emailAddress: {
    type:String,
    required: true,
    unique: true,
  },
  age: {
    type:Number,
    required: false,
  }
})

module.exports = mongoose.model("Contact",contactSchema)