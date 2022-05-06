log_in_time = new Date();

// Constructor for quicker input if used manually.
function hop(server = "default", force_hop = false) {
    hop_server(server, force_hop);
}

function hop_server(server = "default", force_hop = false){
    // Quick check to see if it's too soon to hop. Set 
    if(mssince(log_in_time)<59900 && force_hop != true) {game_log("Hopping too soon, please wait.", "red");return;}
    if(server == "default") {
        if (parent.server_name == "Americas I"){
            change_server("US","II");
        } 
        else if (parent.server_name == "Americas II"){
            change_server("US","III");
        }
        else if (parent.server_name == "Americas III"){
            change_server("EU","I");
        }
        else if (parent.server_name == "Europas I"){
            change_server("EU","II");
            //world = 6;
        }
        else if (parent.server_name == "Europas II"){
            change_server("US", "I");
            //world = 2;
        }
    }
    else if (server == "US1" || server == "us1" || server == "US" || server == "Americas I") change_server("US","I");
    else if (server == "US2" || server == "us2" || server == "Americas II") change_server("US","II");
    else if (server == "US3" || server == "us3" || server == "Americas III") change_server("US","III");
    else if (server == "EU1" || server == "eu1" || server == "EU" || server == "Europas I") change_server("EU","I");
    else if (server == "EU2" || server == "eu2" || server == "Europas II") change_server("EU","II");
    else game_log("Options: US1 / US2 / US3 / EU1 // EU2");
}