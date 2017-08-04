/* TEST STUFF*/

var program = require('commander');
var rpc = require('json-rpc2');
var ABI = require('ethereumjs-abi');
var abi = new ABI();
var master = "0x443B9375536521127DBfABff21f770e4e684475d";
var ethJsUtil = require('../js-util');
var live_node = "52.37.130.246";
var rpc_port = "8545";
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://52.37.130.246:8545"))

client = rpc.Client.$create(rpc_port, live_node);

function purchaseToken(_fromAddr, _contractAddr, _value){
    console.log("Calling Purchase Token")
    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        value: _value,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('purchaseToken',[],[]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );
}


purchaseToken(master,"0x8e07c06f00416fb7894ee0a81ee7231f969b9c28", "0xB1A2BC2EC50000");


function createProduct(_name, _price, _limit, _contractAddr){

    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('createProduct',["bytes32","uint256","uint256"],[_name, _price, _limit]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );
}



function nullifyProduct(_name, _contractAddr){

    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('nullifyProduct',["bytes32"],[_name]).toString('hex')
            }],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                7} //end if
                    respond_str = response;

               }
            );
}

