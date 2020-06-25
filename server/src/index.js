const app = require("./app");
const { port } = require("../config/config");
const UserPort = require("./models/userPort");
const { userPortStart } = require("./../config/config");

const ensureUserPort = async () => {
  let port = await UserPort.find({});
  port = port[0];
  if (!port) {
    port = new UserPort({ currentPort: userPortStart });
    try {
      await port.save();
    } catch (e) {
      console.error(`Problem declaring starting port ${e}`);
    }
  }
};

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

ensureUserPort();
