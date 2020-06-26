const sendDeleteCommandsW = (workerDNS, userName, projectName) => {
  const rexec = require("remote-exec");
  const fs = require("fs");
  // see documentation for the ssh2 npm package for a list of all options
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: require("fs").readFileSync("./CloudProjectKeyPair.pem"),
  };
  const hosts = [workerDNS];

  const cmds = [
    "sudo rm -rf /data-" + userName + "-" + projectName + "",
    "sudo rm -rf /bitnami-" + userName + "-" + projectName + "",
  ];
  //console.log("testing : ", cmds);
  rexec(hosts, cmds, connection_options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Great Success!!");
    }
  });
};

module.exports = sendDeleteCommandsW;
