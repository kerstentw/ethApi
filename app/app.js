var express = require('express');
var fs = require("fs");
var conDep = require("./scripts/contractDep");
var endpoints = require("./scripts/CTConstantsApi");
var rawSend = require("./scripts/rawContractDep");
var bp = require('body-parser');
var mS = require("./scripts/multiSigHandler")
var WBF = require("./scripts/WBF_Handler")

rawRpc = require("./scripts/ethRpc");
var app = express();

app.use('/static',express.static('static')); //sets static root
app.use(bp());

app.get("/", function(req, res){
  fs.readFile("index.html",function(err,data){
    res.write(data);
    res.end();
  });
});



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get('eth/wristbandconfirm',function(req,res){
    key = "b443724b85036c325868ea9f5038f5579d970e6c20ab81d28f8e22702f2d271d"
    //TODO: Check the input vars
    if (req.query.key != key){
      res.send(JSON.stringify({status:fail, message: "Incorrect Key"}));
    }

    tag = req.query.hashtag;
    WBF.sqliteQuery(tag); //returns (bool success_state, string message)
    


    setTimeout(function(){
    info = WBF.getMessage
        if (info[0] == true){
            stat = "success"
        } else {
            stat = "fail"
        }
    res.send(JSON.stringify({status: stat, message: info[1]}))
    },500);

});



app.get('/eth/addrInfo', function(req, res){
    if(typeof(req.query.addr) == "undefined"){res.send(JSON.stringify({status: "fail", message: "Please send through data"}))};
    rawRpc.addrInfo(req.query.addr);
    setTimeout(function(){
                          info = rawRpc.respond();
                          res.send(JSON.stringify({status: "success", message: {balance: info[0], nonce: info[1]}}))},1500); 

});


app.get('/multisig/confirmtrans', function(req, res){
    
    if(typeof(req.query.trans_id) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through data"}))}; 
    mS.confirmTransaction(req.query.trans_id);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: mS.respond()}));},1500);

});




app.get('/multisig/submittrans', function(req, res){
    
    if((typeof(req.query.dest) == "undefined") || (typeof(req.query.val) == "undefined") ||  (typeof(req.query.dest) == "undefined") ){ res.send(JSON.stringify({status: "fail", message: "Please send through data"}))}
    mS.submitTransaction(req.query.dest, parseInt(req.query.val),req.query.data, parseInt(req.query.nonce));
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: mS.respond()}));},1500);

});




app.get('/eth/genabi', function(req, res){
    //if(typeof(req.query.method) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through data"}))}

    endpoints.genABI(req.query.method, req.query.types, req.query.args);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);


});




app.get('/eth/sendRaw', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through data"}))}
    
    endpoints.sendRaw(req.query.data);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);
    

});



app.get('/eth/contract/call/balanceof', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}
    
    endpoints.balanceof(req.query.addr,req.query.useraddr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);
    

});




app.get('/eth/get_contract_addr', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}
    
    endpoints.getContractAddr(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);
    

});


app.get('/eth/contract/call/owner', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}
    
    endpoints.owner(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);
    

});

app.get('/eth/contract/call/initialissuance', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}

    endpoints.initialIssuance(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/totalsupply', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.totalSupply(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/currentethprice', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.currentEthPrice(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/currenttokenprice', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.currentTokenPrice(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/ticketprice', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.ticketPrice(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/symbol', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.symbol(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});



app.get('/eth/contract/call/name', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.name(req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/checkproduct', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through payload"}))}


    endpoints.checkProduct(req.query.name,req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/inventoryproduct', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through payload"}))}


    endpoints.inventoryProduct(req.query.name,req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


/*
app.post('/eth/deploy_code', function(req,res){
    var contract_code = req.body.contractcode.toString();
    console.log("GETTING::: " + contract_code);
    if (typeof(contract_code) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through payload"})); return;}

    rawSend.compileSend(contract_code);

    setTimeout(function(){
               data = rawSend.returnData();
               console.log('AHAHAHA::: ' + data);
               res.send(JSON.stringify({status: "success", message: data}));
               },20000);
    

});
*/


app.get('/eth/deploy_contract', function(req, res){
     
    console.log(req.query.name)
    if (
        (typeof(req.query.name) == "undefined") ||
        (typeof(req.query.totalSupply) == "undefined") ||
        (typeof(req.query.owner) == "undefined") || 
        (typeof(req.query.currentEthPrice) == "undefined") ||
        (typeof(req.query.currentTokenPrice) == "undefined") ||
        (typeof(req.query.symbol) == "undefined") ||
        (typeof(req.query.ownerInitialBalance) == "undefined")
    ){ 
         res.send({status: "fail", message: "Please send through name, totalSupply, owner, currentEthPrice, currentTokenPrice, symbol, and ownerInitialBalance"})  
     }
     

     ConfToken = capitalizeFirstLetter(req.query.name)
     
     conDep.compileSend(ConfToken,
                       req.query.name,
                       parseInt(req.query.totalSupply),
                       req.query.owner,
                       parseInt(req.query.currentEthPrice),
                       parseInt(req.query.currentTokenPrice),
                       req.query.symbol,
                       parseInt(req.query.ownerInitialBalance)
                      );
     
    setTimeout(function(){
                   data = conDep.returnData();
                   console.log('AHAHAHA::: ' + data)
                   res.send(JSON.stringify({status: "success", message: data}));
               },20000);
    

});


app.get('/davidendpoint', function (req, res){
  fs.readFile("templates/davidEndpoint.html", function(err,data){
    res.write(data);
    res.end();
  });
  

});

app.get('/icosec', function (req, res) {

  fs.readFile("templates/secIndex.html",function(err,data){
    res.write(data);
    res.end();
  });

});


app.post('/email_submit', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name,
      email:req.query.email
   };

  //TODO::: Add to database

   res.end(JSON.stringify(response));
});

// TODO : Figure out Name
// TODO : Add a express-sessions support
// TODO : Design Frontpage
// TODO : Token Environment Search
// TODO : Token Wiki;
// TODO : Legal Document Generator
// TODO : Add Database MySQL
// TODO : BitLegal Rating. 


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Test app listening at http://%s:%s", host, port)

});
