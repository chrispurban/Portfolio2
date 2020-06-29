const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  content:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectID,
    ref:'User'
  },
  timestamps:true
});

let taskSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  priority:{
    type:Double,
    required:true
  },
  status:{
    type:Integer,
    default:0
  },
  messages:[messageSchema],
  owner:{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },{
  timestamps:true
});

module.exports = mongoose.model('Task', taskSchema);
