// import the dependencies
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String
    },
    email: {
        type: String
      },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: []
  },
    {
      toJSON: {
        virtuals: true,
      },
      id: false
    }
  );

// get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;