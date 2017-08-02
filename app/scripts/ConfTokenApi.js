module.exports = {
totalSupply: totalSupply,
createProduct: createProduct,
nullifyProduct: nullifyProduct,
modifyProductPrice: modifyProductPrice,
modifyProductLimit: modifyProductLimit,
modifyProductPrice: modifyProductPrice,
inventoryProduct: inventoryProduct,
checkProduct: inventoryProduct,
buyToken: buyToken,
purchaseProduct: purchaseProduct
}


function totalSupply(){
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function createProduct(bytes32 _name, uint128 price, uint256 limit) returns(bool success) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function nullifyProduct(bytes32 _name) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function modifyProductPrice(bytes32 _name, uint256 newPrice) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function modifyProductLimit(bytes32 name, uint256 newLimit) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}

function modifyProductPrice(bytes32 _name, uint256 newPrice, uint256 newLimit) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function inventoryProduct(bytes32 _name) constant returns(uint productAmnt) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function checkProduct(bytes32 _name) constant returns(uint productAmnt) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function buyToken() payable returns(uint256) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}


function purchaseProduct(bytes32 _name, uint256 amnt) {
function create_contract(cont_info){
    client.call('eth_sendTransaction',[{
                from: config.senderAddr,
                data: '0x' + String(cont_info["bc"]),
                gas: '0x47b760'
            }],function(err,response){

                console.log("GFIT FASJHDFAKSJLDHKJASSDKJH");
                if (err){
                    console.error("request problem at either eth_sendTransaction or __ethPriceCallback");
                    //console.error(String(err.message));
                    console.log(err.message);
                    return;
                }

                data_thing =  JSON.stringify({bytecode: cont_info["bc"], abi: cont_info["inter"], tx: response, contractAddr: contractAddr, source: cont_info["code"]});
             });


}

}

