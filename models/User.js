// import the dependencies
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    // Must match a valid email address (look into Mongoose's matching validation)
    email: {
      type: String,
      required: true,
      unique: true
      // matching validation
    },
    // Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    // Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
    {
      toJSON: {
        virtuals: true,
      },
      id: false
    }
  );

// self-reference, get total count of friends on retrieval, retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;