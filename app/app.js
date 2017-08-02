var express = require('express');
var fs = require("fs");
var conDep = require("./scripts/contractDep");
var endpoints = require("./scripts/CTConstantsApi");


var app = express();

app.use('/static',express.static('static')); //sets static root

app.get("/", function(req, res){
  fs.readFile("index.html",function(err,data){
    res.write(data);
    res.end();
  });
});

/**/


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



app.get('/eth/purchase_token', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}
    
    endpoints.purchaseToken(req.query.addr);
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
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.checkProduct(req.query.name,req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});


app.get('/eth/contract/call/inventoryproduct', function(req, res){
    if(typeof(req.query.addr) == "undefined"){ res.send(JSON.stringify({status: "fail", message: "Please send through addr"}))}


    endpoints.inventoryProduct(req.query.addr,req.query.addr);
    setTimeout(function(){res.send(JSON.stringify({status: "success", message: endpoints.respond()}));},1500);

});







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
