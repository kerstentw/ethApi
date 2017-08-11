var program = require('commander');
var rpc = require('json-rpc2');
var ABI = require('ethereumjs-abi');
var abi = new ABI();
var master = "0x443B9375536521127DBfABff21f770e4e684475d";
var ethJsUtil = require('./js-util');
var live_node = "52.37.130.246";
var rpc_port = "5545";
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://52.37.130.246:8545"))

walletAbi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"}],"name":"confirmations","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"nonce","type":"uint256"}],"name":"submitTransaction","outputs":[{"name":"transactionHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"confirmationCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_required","type":"uint256"}],"name":"updateRequired","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"transactions","outputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"nonce","type":"uint256"},{"name":"executed","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"isConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"confirmTransaction","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8[]"},{"name":"rs","type":"bytes32[]"}],"name":"submitTransactionWithSignatures","outputs":[{"name":"transactionHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"executeTransaction","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPendingTransactions","outputs":[{"name":"_transactionList","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"required","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getExecutedTransactions","outputs":[{"name":"_transactionList","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"revokeConfirmation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionHash","type":"bytes32"},{"name":"v","type":"uint8[]"},{"name":"rs","type":"bytes32[]"}],"name":"confirmTransactionWithSignatures","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"}],"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"transactionHash","type":"bytes32"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"transactionHash","type":"bytes32"}],"name":"Revocation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionHash","type":"bytes32"}],"name":"Submission","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionHash","type":"bytes32"}],"name":"Execution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"}],"name":"OwnerAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"}],"name":"OwnerRemoval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"required","type":"uint256"}],"name":"RequiredUpdate","type":"event"}];


ret_string = "none"
multisigAddr = "No Wallet Set"

module.exports.submitTransaction = function(_destination, _value,  _data, _nonce){
  ret_string = abi.rawEncode("submitTransaction",["address", "uint", "bytes", "uint"],[_destination, _value, _data, _nonce]).toString("hex");
}


//var x = module.exports.submitTransaction("0x99892Ac6DA1b3851167Cb959fE945926bca89f09","1000000000000","0x","1");
//console.log(x);


module.exports.confirmTransaction = function(_transHash){
  ret_string = abi.rawEncode("confirmTransaction",["bytes32"],[_transHash]).toString("hex");
} 

module.exports.revokeConfirmation = function(_transHash){
  ret_string = abi.rawEncode("revokeConfirmation",["bytes32"],[_transHash]).toString("hex");
}

/*
module.exports.addOwner=function(addressowner){}
module.exports.removeOwner=function(addressowner){}
module.exports.updateRequired=function(uint_required){}
module.exports.submitTransactionWithSignatures=function(addressdestination,uintvalue,bytesdata,uintnonce,uint8[]v,bytes32[]rs){}
module.exports.confirmTransactionWithSignatures=function(bytes32transactionHash,uint8[]v,bytes32[]rs){}
module.exports.executeTransaction=function(bytes32transactionHash){}
module.exports.MultiSigWallet=function(address[]_owners,uint_required){}
module.exports.isConfirmed=function(bytes32transactionHash){}
module.exports.confirmationCount=function(bytes32transactionHash){}
module.exports.getPendingTransactions=function(){}
module.exports.getExecutedTransactions=function(){}
*/


module.exports.respond = function() {
   return ret_string;
}


