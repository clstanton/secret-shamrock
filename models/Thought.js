const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  userName: {
    type: String
  },    
  reactions: []
},
  {
  toJSON: {
    virtuals: true,
    getters: true
  },
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;