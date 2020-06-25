module.exports = {
  port: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongodbUrl: process.env.MONGODB_URL,
  userPortStart: process.env.USER_PORT_START,
  userPortEnd: process.env.USER_PORT_END,
  masterDns: process.env.MASTER_DNS,
  workerDns: process.env.WORKER_DNS,
};
