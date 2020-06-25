const rexec = require("remote-exec");
const fs = require("fs");

//TODO: test it

const sendCommandsMaster = (masterDNS, userName, projectName, portNumber) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./linpair.pem"),
  };
  const hosts = [
    //Master Instance
    masterDNS,
  ];

  const cmds = [
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

  rexec(hosts, cmds, connection_options, (err) => {
    console.log(res);

    if (!err) {
      return;
    } else {
      console.error(err);
    }
  });
};

const createCluster = (
  workerDNS,
  masterDNS,
  portNumber,
  userName,
  projectName
) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./linpair.pem"),
  };
  const hosts = [
    //Worker Instance
    workerDNS,
  ];

  const workerCmds = [
    //Worker first part
    "sudo mkdir /data-" + userName + "-" + projectName + "",
    "sudo chmod  -R 777 /data-" + userName + "-" + projectName + "",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "/mariadb",
    "sudo mkdir /bitnami-" + userName + "-" + projectName + "/wordpress",
    "sudo chmod -R 777 /bitnami-" + userName + "-" + projectName + "/",
  ];
  rexec(hosts, workerCmds, connection_options, (err) => {
    if (!err) {
      sendCommandsMaster(masterDNS, userName, projectName, portNumber);
    } else {
      console.error(err);
    }
  });
};

module.exports = createCluster;
