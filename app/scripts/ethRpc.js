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

return_str = "bad output"

client = rpc.Client.$create(rpc_port, live_node);

function hex2d(hex){

    var ret_int = parseInt(hex, 16);
    return ret_int
}


module.exports.addrInfo = function (_addr){

    client.call("eth_getBalance",[_addr,"latest"],function(err,resp){

        return_str = [];

        if (err){ return_str = err.message; console.log(err.message); return}        

        return_str[0] = hex2d(resp);
        console.log(resp) 

        client.call("eth_getTransactionCount",[_addr,"latest"],function(err,resp){
            if (err){ return_str = err.message}
            return_str[1] = hex2d(resp);
            console.log(resp)
        });



    });



}

module.exports.respond = function(){ return return_str;}
