// import dependencies
const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      maxlength: [280, 'Exceeds the maximum allowed length (280)!'],
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
    {
      toJSON: {
        getters: true
      }
    }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      maxlength: [280, 'Exceeds the maximum allowed length (280)!'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    // The user who created this thought
    username: {
      type: String,
      required: true
    },   
    // like replies, array of nested documents created with the reactionSchema 
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// add a virtual to get the total reaction count, retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;