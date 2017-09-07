/* TODO: Web3 libraries and API builder */
sqlite3 = require("sqlite3");

config = {
    table: "tags",
    db_name: "tags.db",
    db: new sqlite3.Database('./tags.db')
}

message = undefined;

module.exports.sqliteQuery = function (tag_id){
    select_query = "SELECT * FROM " + config.table + " WHERE hashtag='" + tag_id + "'"; 
    console.log("QUERY:  " + select_query);
    change_query = "UPDATE tags SET checkedin ='True' WHERE hashtag='" + tag_id +"'"; //Python booleans
    found = false;
    config.db.each(select_query,function(err,row){

                    found = true;
                    if (typeof(row.hashtag) != "undefined" && row.checkedin == "False") {
                    	config.db.run(change_query)
                    	message = [true,row.hashtag]
                    } else if (row.checkedin == "True"){
                    	message = [false, "Tag Already Used"]
                    } else {
                    	message = [false, "Tag not found"]
                    }


                    if (err) {
                        //

                    }
                });
    resp = config.db.each(select_query)
    console.log(Object.getOwnPropertyNames(resp))
    //config.db.run(change_query)    
    
    if (typeof(message) == "undefined"){
    	message = [false, "Hashtag Not Found"]
    }
}



module.exports.getMessage = function(){
    console.log(message)
    return message;
}

//SqliteQuery('cc58dcfa');

//SqliteQuery('cc58dcfa');	

//SqliteQuery("aaaaaaaa")


setTimeout(module.exports.getMessage, 1000);



function TransferTokens(){
    /* Takes parameters and sends transferTo() call to blockchain */
    /* utilize web3 lib for ease of use... */
    
    

}


function updateEventLog(){


}