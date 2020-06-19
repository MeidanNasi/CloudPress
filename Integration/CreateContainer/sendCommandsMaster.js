const sendCommandsMaster = (masterDNS, userName, projectName, portNumber) => {
  var rexec = require("remote-exec");
  var fs = require("fs");
  var connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: require("fs").readFileSync("./linpair.pem"),
  };
  var hosts = [
    //Master Instance
    masterDNS,
  ];

  var cmds = [
    "sudo -i sed -i -e 's/mariadb-pv/mariadb-" +
      userName +
      "-" +
      projectName +
      "-pv/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/bitnami/bitnami-" +
      userName +
      "-" +
      projectName +
      "/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i kubectl create -f /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/wordpress-pv/wordpress-" +
      userName +
      "-" +
      projectName +
      "-pv/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data1/data-" +
      userName +
      "-" +
      projectName +
      "/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i kubectl create -f  /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-wordpress-mariadb-0/data-wordpress-" +
      userName +
      "-" +
      projectName +
      "-mariadb-0/g' /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i sed -i -e 's/wordpress-wordpress/wordpress-" +
      userName +
      "-" +
      projectName +
      "-wordpress/g' /tmp/wordpress-pvc.yaml",
    "sudo -i kubectl create -f /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i kubectl create -f /tmp/wordpress-pvc.yaml",
    "sudo -i sed -i -e 's/mariadb-" +
      userName +
      "-" +
      projectName +
      "-pv/mariadb-pv/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/bitnami-" +
      userName +
      "-" +
      projectName +
      "/bitnami/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/wordpress-" +
      userName +
      "-" +
      projectName +
      "-pv/wordpress-pv/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-" +
      userName +
      "-" +
      projectName +
      "/data1/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-wordpress-" +
      userName +
      "-" +
      projectName +
      "-mariadb-0/data-wordpress-mariadb-0/g' /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i sed -i -e 's/wordpress-" +
      userName +
      "-" +
      projectName +
      "-wordpress/wordpress-wordpress/g' /tmp/wordpress-pvc.yaml",
    "sudo -i helm install --name wordpress-" +
      userName +
      "-" +
      projectName +
      " \
        --set wordpressUsername=admin,wordpressPassword=adminpassword,mariadb.mariadbRootPassword=secretpassword,persistence.existingClaim=wordpress-" +
      userName +
      "-" +
      projectName +
      "-wordpress,allowEmptyPassword=false, service.nodePorts.http=" +
      portNumber +
      " \
      stable/wordpress",
  ];

  //console.log("testing : ", cmds);
  rexec(hosts, cmds, connection_options, function (res, err) {
    console.log(res);

    if (err) {
      console.log(err);
    } else {
      console.log("Great Success!!");
    }
  });
};

module.exports = sendCommandsMaster;
