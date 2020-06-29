const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstname:{
    type:String,
    default:''
  },
  lastname:{
    type:String,
    default:''
  },
  admin:{
    type:Boolean,
    default:false
  }
});

userSchema.plugin(passport);

module.exports = mongoose.model('User', userSchema);
