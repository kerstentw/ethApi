var program = require('commander');
var rpc = require('json-rpc2');
var ABI = require('ethereumjs-abi');
var abi = new ABI();
var master = "0x443B9375536521127DBfABff21f770e4e684475d";
var ethJsUtil = require('./js-util');
var live_node = "52.37.130.246";
var rpc_port = "8545";
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://52.37.130.246:8545"))

client = rpc.Client.$create(rpc_port, live_node);


module.exports = {
    owner: owner,
    initialIssuance: initialIssuance,
    totalSupply: totalSupply,
    currentEthPrice: currentEthPrice,
    currentTokenPrice: currentTokenPrice,
    ticketPrice: ticketPrice,
    symbol: symbol,
    name: name,
    checkProduct: checkProduct,
    inventoryProduct: inventoryProduct,
    respond_str: respond_str,
    respond: respond,
    getContractAddr: getContractAddr,
    purchaseToken: purchaseToken,
    nullifyProduct: nullifyProduct,
    createProduct: createProduct,
    sendRaw: sendRaw,
    balanceof: balanceof
}



var respond_str = "Too early";
var public_addr = "";


function respond(){
    return respond_str;
}

function pull_callback(nonce){
      respond_str = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
      public_addr, nonce));

}

function getContractAddr(addr){
    public_addr = addr;
    var nonceContainer = web3.eth.getTransactionCount(addr);
    nonceContainer.then(pull_callback);
}


function sendRaw(raw_data){

    respond_str = "";
    client.call('eth_sendRawTransaction',[{
        data: raw_data
            }],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if

                    respond_str = response;

               }
            );


}


function balanceof(cont_addr,user_addr) {
    console.log("OWNER")
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('balanceOf',['address'],[user_addr]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = response.replace("000000000000000000000000","");
               console.log(respond_str)

               }
            );

}






function owner(cont_addr) {
    console.log("OWNER")
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('owner',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = response.replace("000000000000000000000000","");
               console.log(respond_str)

               }
            );

}


function initialIssuance(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('initialIssuance',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    console.log("ERROR")
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2d(response);

               }
            );


}


function totalSupply(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('totalSupply',[],[]).toString('hex'),
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2d(response);

               }
            );


}


function currentEthPrice(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('currentEthPrice',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2d(response);

               }
            );


}


function currentTokenPrice(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('currentTokenPrice',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2d(response);

               }
            );


}


function ticketPrice(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('ticketPrice',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2d(response);

               }
            );


}


function symbol(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('symbol',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2a(response);

               }
            );


}


function name(cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('name',[],[]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = hex2a(response);

               }
            );


}


function checkProduct(_name, cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('checkProduct',['bytes32'],[_name]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = response;

               }
            );


}

function inventoryProduct(_name, cont_addr){
    respond_str = "";
    client.call('eth_call',[{
        from: master,
        to: cont_addr,
        data: '0x'+ abi.rawEncode('inventoryProduct',['bytes32'],[_name]).toString('hex')
            },"latest"],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
               respond_str = response;

               }
            );


}




function hex2d(hex){

    var ret_int = parseInt(hex, 16);
    return ret_int
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}  


function purchaseToken(_fromAddr, _contractAddr, _value){

    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        value: _value,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('purchaseToken',[],[]).toString('hex')
            }],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
                respond_str = response;

               }
            );
}


//function purchaseProduct(bytes32 _name, uint256 amnt)




function createProduct(_name, _price, _limit, _contractAddr){

    client.call('eth_sendTransaction',[{
        from: _fromAddr,
        to: _contractAddr,
        data: '0x'+ abi.rawEncode('createProduct',["bytes32","uint256","uint256"],[_name, _price, _limit]).toString('hex')
            }],function(err,response){
                if (err){
                    respond_str = err.message;
                    return;
                } //end if
                    respond_str = response;

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
                } //end if
                    respond_str = response;

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
                } //end if
                    respond_str = response;

               }
            );
}



function test(){
   
    owner("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"Owner " + console.log(respond_str);},3000);

    initialIssuance("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"initialIssuance: " + console.log(respond_str);},3000);


    totalSupply("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"totalSupply: " + console.log(respond_str);},3000);

    currentEthPrice("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"currentEthPrice" + console.log(respond_str);},3000);

    currentTokenPrice("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"currentTokenPrice: " + console.log(respond_str);},3000);


    ticketPrice("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"ticketPrice: " + console.log(respond_str);},3000);

    symbol("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"symbol: " + console.log(respond_str);},3000);


    name("0x60F352141e69Bc57370C3E924F583312aB7D0992");
    setTimeout(function(){"name: " + console.log(respond_str);},3000);

}
