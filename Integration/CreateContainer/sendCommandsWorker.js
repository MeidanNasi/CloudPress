const sendCommandsWorker = (workerDNS, userName, projectName) => {
  var rexec = require("remote-exec");
  var fs = require("fs");
  var connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: require("fs").readFileSync("./linpair.pem"),
  };
  var hosts = [
    //Worker Instance
    workerDNS,
  ];

  var cmds = [
    //Worker first part
    "sudo mkdir /data-" + userName + "-" + projectName + "",
    "sudo chmod  -R 777 /data-" + userName + "-" + projectName + "",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "/mariadb",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "/wordpress",
    "sudo chmod -R 777 /bitnami-" + userName + "-" + projectName + "/",
  ];
  rexec(hosts, cmds, connection_options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("sent commands");
      return err;
    }
  });
};
module.exports = sendCommandsWorker;
