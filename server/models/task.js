const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** let messageSchema = new Schema({
  content:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectID,
    ref:'User'
  },
  timestamps:true
}); **/

let taskSchema = new Schema(
  {
    subject:{
      type:String,
      required:true,
    },
    issue:{
      type:String,
      required:true
    },
    history:[{
      type:Object
    }],
    //messages:[messageSchema],
    owner:{
      type:String,
      required: true
    },
    notes:{
      type:String
    },
    deadline:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);
