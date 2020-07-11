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
    details:{
      type:String,
      required:true
    },
    maturity:{
      type:Number,//int
      default:1
    },
    //messages:[messageSchema],
    owner:{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User'
    }
  },{
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);
