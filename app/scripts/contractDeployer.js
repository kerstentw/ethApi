var http = require("http");
var ABI = requre("ethereumjs-abi");
var rpc = require('json-rpc2');
var abi = new ABI();
var contractTemplate1 = require("./contractTemplate1")

var config = {
    eventThrowerAddr: "0xece7acc6c90b8bc45bbefcda22b3731d3d76842d",
    senderAddr: "0x0602c3ea000e6179ffc15d3dfff972517e70d087",
    host: "52.37.130.246",
    rpc_port: "5545",
};

client = rpc.Client.$create(config.rpc_port, config.host);



module.export = {
    deployContract: deployContract

}



function deployContract(contract_data){


}
