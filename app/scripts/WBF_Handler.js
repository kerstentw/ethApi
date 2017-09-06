/* TODO: Web3 libraries and API builder */
require("sqlite3")

config = {
    table: "tags",
    db_name: "tags.db"
}

module.exports.updateDB = function(tag_id){
    /* Receives tag ID and controls flow of the DB_Check and the Transaction */
    

}




function SqliteQuery(tag_id){
    select_query = "SELECT * FROM " + config.table + "WHERE hashtag=" + tag_id; 
    change_query = "UPDATE checkedin VALUE 'True' WHERE hashtag=" + tag_id; //Python booleans
    
}

function TransferTokens(){
    /* Takes parameters and sends transferTo() call to blockchain */
    /* utilize web3 lib for ease of use... */
    
    

}


function updateEventLog(){


}