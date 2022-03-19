const mongoose = require('../db/conn')
const {Scheema} = mongoose

const Pet = mongoose.model(new Scheema({
  name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  available: {
    type: Bollean
  },

  user: Object,
  adobter: Object

}, {timestamps: true}))


module.exports = Pet