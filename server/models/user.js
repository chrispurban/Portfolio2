const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  admin:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('User', userSchema);
