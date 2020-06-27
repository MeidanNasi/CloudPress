const util = require("util");
const rexec = util.promisify(require("remote-exec"));
const fs = require("fs");

//TODO: test it

const sendCommandsMaster = async (masterDNS, projectId, portNumber) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./src/utils/linpair.pem"),
  };
  const hosts = [masterDNS];

  const masterCmds = [
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

  try {
    const err = await rexec(hosts, masterCmds, connection_options);
    if (err) {
      throw new Error(err);
    }
  } catch (e) {
    throw e;
  }
};

const createCluster = async (workerDNS, masterDNS, projectId, portNumber) => {
  const connection_options = {
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("./src/utils/linpair.pem"),
  };
  const hosts = [workerDNS];

  const workerCmds = [
    "sudo mkdir /data-" + projectId + "",
    "sudo chmod  -R 777 /data-" + projectId + "",
    "sudo mkdir /bitnami-" + projectId + "",
    "sudo mkdir /bitnami-" + projectId + "/mariadb",
    "sudo mkdir /bitnami-" + projectId + "/wordpress",
    "sudo chmod -R 777 /bitnami-" + projectId + "/",
  ];
  try {
    const err = await rexec(hosts, workerCmds, connection_options);
    if (!err) {
      await sendCommandsMaster(masterDNS, projectId, portNumber);
    } else {
      throw new Error(err);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = createCluster;
