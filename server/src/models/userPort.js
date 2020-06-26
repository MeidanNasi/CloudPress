const mongoose = require("mongoose");
const { userPortEnd } = require("../../config/config");

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

userPortSchema.statics.fetchCurrentPort = async () => {
  let currentPortCount = await UserPort.find({});
  currentPortCount = currentPortCount[0].currentPort;

  if (currentPortCount > userPortEnd) {
    throw new Error("Port limit reached!");
  } else {
    return currentPortCount;
  }
};
userPortSchema.statics.setCurrentPort = async (newCurrentPort) => {
  return UserPort.findOneAndUpdate({}, { currentPort: newCurrentPort });
};

const UserPort = mongoose.model("UserPort", userPortSchema);

module.exports = UserPort;
