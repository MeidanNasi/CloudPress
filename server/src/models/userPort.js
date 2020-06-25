const mongoose = require("mongoose");

const userPortSchema = new mongoose.Schema(
  {
    currentPort: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserPort = mongoose.model("UserPort", userPortSchema);

module.exports = UserPort;
