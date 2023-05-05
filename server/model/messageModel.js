const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        require: true,
      },
    },
    users: Array,
    sender: {
      type: ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
