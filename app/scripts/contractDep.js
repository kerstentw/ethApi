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
    rpc_port: "8545",
};


module.exports = {
    compileSend: compileSend,
    returnData: returnData
    
}

web3 = new Web3(new Web3.providers.HttpProvider("http://" + config.host + ":" + config.rpc_port));
client = rpc.Client.$create(config.rpc_port, config.host);


function format_contract( _conf_token,
                          _name,
                          _total_supply,
                          _owner,
                          _current_eth_price,
                          _current_token_price,
                          _symbol,
                          _owner_initial_balance
                        ){

    //Set Variables

    var ConfToken = _conf_token;
    var name = _name;
    var totalSupply = _total_supply;
    var owner = _owner;
    var currentEthPrice = _current_eth_price;
    var currentTokenPrice = _current_token_price;
    var symbol = _symbol;
    var ownerInitialBalance = _owner_initial_balance;

    //formatting string
    //TODO: Create a more flexible version of this function

    var return_string = 'pragma solidity ^0.4.14;contract ' + ConfToken + ' { address internal listenerAddr; address public owner; uint256 public initialIssuance; uint public totalSupply; uint256 public currentEthPrice; uint256 public currentTokenPrice; bytes32 public symbol; bytes32 public name; mapping(address => mapping(address => uint256)) allowed; mapping(address => uint256) balances; mapping(bytes32 => uint256) public productLimits; mapping(bytes32 => uint256) public productPrices; mapping(address => mapping(bytes32 => uint256)) productOwners; event Transfer(address indexed from, address indexed to, uint256 value); function ' + ConfToken + '() { name = "' + name + '"; totalSupply = '+ totalSupply + '; initialIssuance = totalSupply; owner = ' + owner + '; currentEthPrice = ' + currentEthPrice + '; currentTokenPrice = '+ currentTokenPrice + ';  symbol = "' + symbol + '"; balances[owner] = ' + ownerInitialBalance + '; } function safeMul(uint a, uint b) constant internal returns(uint) { uint c = a * b; assert(a == 0 || c / a == b); return c; } function safeSub(uint a, uint b) constant internal returns(uint) { assert(b <= a); return a - b; } function safeAdd(uint a, uint b) constant internal returns(uint) { uint c = a + b; assert(c >= a && c >= b); return c; } /* Methods */ function balanceOf(address _addr) constant returns(uint256 bal) { return balances[_addr]; } function totalSupply() constant returns(uint) { return totalSupply; } function setTokenPrice(uint256 _amount) { assert(msg.sender == owner); currentTokenPrice = _amount; } function setEthPrice(uint128 _amount) { assert(msg.sender == owner); currentEthPrice = _amount; } function seeEthPrice() constant returns(uint256) { return currentEthPrice; } function __getEthPrice(uint256 price) { assert(msg.sender == owner); currentEthPrice = price; } function newProduct(bytes32 _name, uint256 price, uint256 limit){ productPrices[_name] = price; productLimits[_name] = limit; } function nullifyProduct(bytes32 _name) { productLimits[_name] = 0; } function modifyProductPrice(bytes32 _name, uint256 newPrice) { productPrices[_name] = newPrice; productLimits[_name] = productLimits[_name]; } function modifyProductLimit(bytes32 _name, uint256 newLimit) { productLimits[_name] = newLimit; productPrices[_name] = productPrices[_name]; } function modifyProductPrice(bytes32 _name, uint256 newPrice, uint256 newLimit) { productPrices[_name] = newPrice; productLimits[_name] = newLimit; } function inventoryProduct(bytes32 _name) constant returns(uint256 productAmnt) { return productLimits[_name]; } function checkProduct(bytes32 _name) constant returns(uint256 productAmnt) { return productOwners[msg.sender][_name]; } function purchaseProduct(bytes32 _name, uint256 amnt) { uint256 totalPrice = safeMul(productPrices[_name], amnt); balances[msg.sender] = safeSub(balances[msg.sender], totalPrice); totalSupply += totalPrice; productLimits[_name] = safeSub(productLimits[_name], amnt); productOwners[msg.sender][_name] = safeAdd(productOwners[msg.sender][_name], amnt); } function purchaseToken() payable returns(uint256 tokensSent) { uint256 totalTokens = (currentEthPrice * msg.value) / (currentTokenPrice * (10 ** 18)); totalSupply = safeSub(totalSupply, totalTokens); balances[msg.sender] = safeAdd(balances[msg.sender], totalTokens); return totalTokens; } function transfer(address _to, uint256 _value) payable returns(bool success) { balances[msg.sender] = safeSub(balances[msg.sender], _value); balances[_to] = safeAdd(balances[_to], _value); Transfer(msg.sender, _to, _value); return true; } function transferFrom(address _from, address _to, uint256 _value) returns(bool) { balances[_from] = safeSub(balances[_from], _value); allowed[_from][msg.sender] = safeSub(allowed[_from][msg.sender], _value); balances[_to] = safeAdd(balances[_to], _value); return true; } function approve(address _spender, uint _value) returns(bool success) { allowed[msg.sender][_spender] = _value; return true; } function __redeem() returns(bool success) { assert(msg.sender == owner); assert(msg.sender.send(this.balance)); return true; } function __DEBUG_BAL() returns(uint bal) { return this.balance; } function allowance(address _owner, address _spender) constant returns(uint remaining) { return allowed[_owner][_spender]; } function() { revert(); }}'

 



 
 
   console.log(return_string)
    return return_string;
}


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

function compileSend( _conf_token,
                          _name,
                          _total_supply,
                          _owner,
                          _current_eth_price,
                          _current_token_price,
                          _symbol,
                          _owner_initial_balance
                        ){
    formatted_contract = format_contract(_conf_token, _name, _total_supply, _owner, _current_eth_price, _current_token_price, _symbol, _owner_initial_balance);
//    console.log("\n\n\n\n\n" + formatted_contract + "\n\n\n\n\n");
//    console.log("calc_cont_addr");
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




