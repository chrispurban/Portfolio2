const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let boardSchema = new Schema(
  {
    owner:{
      type:String,
      required: true
    },
    name:{
      type:String,
      required:true,
    },
    tasks:[{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Task'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Board', boardSchema);
