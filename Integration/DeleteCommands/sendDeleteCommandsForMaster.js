const sendDeleteCommandsM = (masterDNS, userName, projectName) => {
  var rexec = require("remote-exec");
  var fs = require("fs");
  // see documentation for the ssh2 npm package for a list of all options
  var connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: require("fs").readFileSync("./CloudProjectKeyPair.pem"),
  };
  var hosts = [masterDNS];

  var cmds = [
    "sudo -i helm delete --purge wordpress-" +
      userName +
      "-" +
      projectName +
      "",
    "sudo -i kubectl delete pvc data-wordpress-" +
      userName +
      "-" +
      projectName +
      "-mariadb-0",
    "sudo -i kubectl delete pvc wordpress-" +
      userName +
      "-" +
      projectName +
      "-wordpress",
    "sudo -i kubectl delete pv mariadb-" + userName + "-" + projectName + "-pv",
    "sudo -i kubectl delete pv wordpress-" +
      userName +
      "-" +
      projectName +
      "-pv",
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

module.exports = sendDeleteCommandsM;
