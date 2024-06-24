const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
  firstName: {
    Type:String,
    require: [true, "First name is require"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: (value) => {
        const nameRegex = /^[a-zA-z\s]*$/
        return nameRegex.test(value)
      },
      message: "First name must container only alphabetic chars"
    }
  },
  lastName: {
    Type:String,
    require: true,
  },
  emailAddress: {
    Type:String,
    require: true,
    unique: true,
  },
  age: {
    Type:Number,
    require: false,
  }
})