const rexec = require("remote-exec");
const fs = require("fs");

//TODO: test it

const waitForCreation = async (isClusterCreated, error) => {
  return new Promise((resolve, reject) => {
    isClusterCreated ? resolve("Cluster created") : reject(error);
  });
};

const sendCommandsMaster = async (masterDNS, projectId, portNumber) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./src/utils/linpair.pem"),
  };
  const hosts = [
    //Master Instance
    masterDNS,
  ];

  const cmds = [
    "sudo -i sed -i -e 's/mariadb-pv/mariadb-" +
      projectId +
      "-pv/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/bitnami/bitnami-" +
      projectId +
      "/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i kubectl create -f /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/wordpress-pv/wordpress-" +
      projectId +
      "-pv/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data1/data-" +
      projectId +
      "/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i kubectl create -f  /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-wordpress-mariadb-0/data-wordpress-" +
      projectId +
      "-mariadb-0/g' /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i sed -i -e 's/wordpress-wordpress/wordpress-" +
      projectId +
      "-wordpress/g' /tmp/wordpress-pvc.yaml",
    "sudo -i kubectl create -f /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i kubectl create -f /tmp/wordpress-pvc.yaml",
    "sudo -i sed -i -e 's/mariadb-" +
      projectId +
      "-pv/mariadb-pv/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/bitnami-" +
      projectId +
      "/bitnami/g' /tmp/mariadb-hostpath.yaml",
    "sudo -i sed -i -e 's/wordpress-" +
      projectId +
      "-pv/wordpress-pv/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-" +
      projectId +
      "/data1/g' /tmp/wordpress-hostpath.yaml",
    "sudo -i sed -i -e 's/data-wordpress-" +
      projectId +
      "-mariadb-0/data-wordpress-mariadb-0/g' /tmp/wordpress-mariadb-pvc.yaml",
    "sudo -i sed -i -e 's/wordpress-" +
      projectId +
      "-wordpress/wordpress-wordpress/g' /tmp/wordpress-pvc.yaml",
    "sudo -i helm install --name wordpress-" +
      projectId +
      " \
--set wordpressUsername=admin,wordpressPassword=adminpassword,mariadb.mariadbRootPassword=secretpassword,persistence.existingClaim=wordpress-" +
      projectId +
      "-wordpress,allowEmptyPassword=false, service.nodePorts.http=" +
      portNumber +
      " \
stable/wordpress",
  ];

  rexec(hosts, cmds, connection_options, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

const createCluster = async (workerDNS, masterDNS, projectId, portNumber) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./src/utils/linpair.pem"),
  };
  const hosts = [
    //Worker Instance
    workerDNS,
  ];

  const workerCmds = [
    //Worker first part
    "sudo mkdir /data-" + projectId + "",
    "sudo chmod  -R 777 /data-" + projectId + "",
    "sudo mkdir /bitnami-" + projectId + "",
    "sudo mkdir /bitnami-" + projectId + "/mariadb",
    "sudo mkdir /bitnami-" + projectId + "/wordpress",
    "sudo chmod -R 777 /bitnami-" + projectId + "/",
  ];
  rexec(hosts, workerCmds, connection_options, (err) => {
    if (!err) {
      sendCommandsMaster(masterDNS, userName, projectName, portNumber);
    } else {
      throw new Error(err);
    }
  });
};

module.exports = createCluster;