const create = require("./Instances/ec2_createinstances");
const describe = require("./Instances/ec_describetest");
const sendCommandsM = require("./CreateContainer/sendCommandsMaster");
const sendCommandsW = require("./CreateContainer/sendCommandsWorker");
const sendDeleteForMaster = require("./DeleteCommands/sendDeleteCommandsForMaster");
const sendDeleteForWorker = require("./DeleteCommands/sendDeleteCommandsForWorker");
let fs = require("fs");

////*********************************Creating Containers and bounding the master and the worker*********************************/
//Creating Containers and bounding the master and the worker
//sendCommandsW("18.232.181.32", "assaf3", "testmaster3"); //Running the WorkerCommands
//sendCommandsM("18.232.188.38", "assaf3", "testmaster3", portNumber); // Running the MasterCommands
// sendCommandsW(
//   "18.232.181.32",
//   userName.toLowerCase(),
//   projectName.toLowerCase()
// );
////*********************************Creating Containers and bounding the master and the worker*********************************/

////*********************************Deleting container from master and worker*********************************/
//sendDeleteForWorker("34.239.162.206", "assaf", "testmaster");
//sendDeleteForMaster("3.233.239.68", "assaf", "testmaster");
////*********************************Deleting container from master and worker*********************************/

////*********************************Building map*********************************/
//map: key:userName, Value: list[{projectName,portNumber}]

let portNumber = 30000;
let myMap = new Map();
let userName;
let projectName;
let userPorts = [];
let test = {
  projectName,
  portNumber,
};
userName = "assaf";
projectName = "testing project 1";

portNumber++;
test.portNumber = portNumber;
test.projectName = projectName;
userPorts.push(test);
myMap.set(userName, userPorts);
test = {};
portNumber++;
projectName = "testing project 2";
test.projectName = projectName;
test.portNumber = portNumber;

userPorts.push(test);
myMap.set(userName, userPorts);

test = {};
portNumber++;
projectName = "testing project 3";
test.projectName = projectName;
test.portNumber = portNumber;

userPorts.push(test);
myMap.set(userName, userPorts);

test = {};
portNumber++;
projectName = "testing project 4";
test.projectName = projectName;
test.portNumber = portNumber;

userPorts.push(test);
myMap.set(userName, userPorts);

console.log("test map ", myMap);
console.log("test list ", userPorts);
////*********************************Building map*********************************/

////*********************************Deleting a project from map*********************************/
// let i;
// let afterLoopIndex;
// for (i = 0; i < userPorts.length; i++) {
//   if (userPorts[i].projectName == "testing project 2") {
//     afterLoopIndex = i;
//   }
// }
// userPorts.splice(afterLoopIndex, 1);
// console.log("test is userPorts ", userPorts);
// console.log("test is map ", myMap);
////*********************************Deleting a project from map*********************************/

////*********************************Viewing all projects*********************************/
// console.log("testing the map", myMap.get("assaf"));
// let testingMap = myMap.forEach((element) => {
//   console.log("the element is ", element);
//   element.forEach((element2) => {
//     console.log("the element2 is ", element2.projectName);
//     if (element2.projectName == "testing project") {
//       console.log("inside if");
//     }
//   });
// });
////*********************************Viewing all projects*********************************/
