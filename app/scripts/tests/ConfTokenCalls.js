/* TEST STUFF*/

var program = require('commander');
var rpc = require('json-rpc2');
var ABI = require('ethereumjs-abi');
var abi = new ABI();
var master = "0x443B9375536521127DBfABff21f770e4e684475d";
var ethJsUtil = require('../js-util');
var live_node = "52.37.130.246";
var rpc_port = "5545";
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



function redeem(_fromAddr, _contractAddr){
    console.log("Calling Redeem")
    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('__redeem',[],[]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );
}


//redeem('0x443B9375536521127DBfABff21f770e4e684475d','0x8e07c06f00416fb7894ee0a81ee7231f969b9c28');



function createProduct(_fromAddr, _contractAddr, _name, _price, _limit){
    console.log("Calling createProduct")
    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('newProduct',['bytes32','uint256','uint256'],[_name, _price, _limit]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );
}

//console.log('0x'+ abi.rawEncode('newProduct',['bytes32','uint256','uint256'],["halle", 1, 1000000]).toString('hex'))

//createProduct('0x443B9375536521127DBfABff21f770e4e684475d','0x55b6d9b9f38de27ed8cf30f354c7aba1e9c43b6a' ,"TEST12",1,200000);
//createProduct('0x443B9375536521127DBfABff21f770e4e684475d',"0x1a31a9cb4ddf39075ae2edbb526737df6eb3fac7", "TEST12",1,200000);


function transfer(_fromAddr, _contractAddr, _toAddr, _amnt){
    console.log("Calling transfer")
    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('transfer',['address','uint256'],[_toAddr, _amnt]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );
}





//transfer('0x443B9375536521127DBfABff21f770e4e684475d','0x55b6d9b9f38de27ed8cf30f354c7aba1e9c43b6a' , "0x5b1318892A5D7a0B94f64aFc0fCDC5B22e884555" ,1)

//transfer('0x443B9375536521127DBfABff21f770e4e684475d',"0x1a31a9cb4ddf39075ae2edbb526737df6eb3fac7" , "0x5b1318892A5D7a0B94f64aFc0fCDC5B22e884555" ,600)

"0x443b94e8fefdce9f0ea9215709998fad94aa86f0"


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



function addTransaction(_fromAddr, _contractAddr, _addr, _value, _data, _nonce){


    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('addTransaction',["address","uint","bytes","uint"],[_addr, _value, _data, _nonce]).toString('hex')
            }],function(err,response){
                if (err){
                    console.log("ERROR::: ");
                    console.log(err.message);
                    return;
                } //end if
                    console.log(response);

               }
            );



}

addTransaction("0x4667d14861def282b68bd25e709caf788cef06ff","0x99892Ac6DA1b3851167Cb959fE945926bca89f09","0x4Ace350Ef2d2d3f1470Dc86afdC32163F9118591","76941400000000000","0x","2");

