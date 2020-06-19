const sendDeleteCommandsW = (workerDNS, userName, projectName) => {
  var rexec = require("remote-exec");
  var fs = require("fs");
  // see documentation for the ssh2 npm package for a list of all options
  var connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: require("fs").readFileSync("./CloudProjectKeyPair.pem"),
  };
  var hosts = [workerDNS];

  var cmds = [
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
