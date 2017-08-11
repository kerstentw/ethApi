var http = require('http')
var program = require('commander');
var rpc = require('json-rpc2');
var ABI = require('ethereumjs-abi');
var solc = require('solc')
var ethJsUtil = require('./js-util');
var Web3 = require('web3');

var data_thing;

var abi = new ABI();

var config = {    //TODO: Place in Config File...
    //eventThrowerAddr: "0xc50a747440447e0f37f1d59140be63edd02e6c42", 
    senderAddr: "0x443b9375536521127dbfabff21f770e4e684475d",
    host: "52.37.130.246",
    rpc_port: "5545",
};


module.exports = {
    compileSend: compileSend,
    returnData: returnData
    
}

web3 = new Web3(new Web3.providers.HttpProvider("http://" + config.host + ":" + config.rpc_port));
client = rpc.Client.$create(config.rpc_port, config.host);


function compile_contract(contract_code){

    var output = solc.compile(contract_code, 1);
    for (var contractName in output.contracts){
        var bytecode = output.contracts[contractName].bytecode;
        var interface = output.contracts[contractName].interface;
    }

    return {bc: bytecode, inter: interface, code: contract_code}

}

var tx_hash;


contractAddr = "NOPE";
formatted_contract = "No Contract";

function run(){
    var cont_info = compile_contract(formatted_contract);
    create_contract(cont_info);
}

function pull_callback(variable){
      console.log("pull_callback")         
      contractAddr = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
      config.senderAddr,variable));
      run();

}

function compileSend(contract_code){
    formatted_contract = contract_code;
    var nonceContainer = web3.eth.getTransactionCount(config.senderAddr);
    nonceContainer.then(pull_callback);
}


function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                console.log('0x' + String(cont_info["bc"]));
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    data_thing = err.message;
                    return;
                }
               
                data_thing =  {bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]}
             });


}


function returnData(){
    console.log(data_thing);
    return data_thing;
}

/*DELETE ME */
//Usage
//compileSend(config.senderAddr);
//setTimeout(returnData,30000);
//////////////////




