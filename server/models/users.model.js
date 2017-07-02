// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
  
    email: {type: String, required: true, unique: true},
    password: { type: String },
    name: { type: String },
    slug: { type: String },
    gender: { type: String },
    isnothere: { type: Boolean },
    timezone: { type: String },
    avatar: { type: String },
    doiToken: { type: String },
    confirmedAt: { type: Date },
    deletedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // Needed for verification
    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: { type: Object },
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date }
  });

  return mongooseClient.model('users', users);
};
