

function send_inv(target = "", ignore_first_x_items = 3, amount_to_send = 1){
    game_log("Sending items to " + target);
    for(i = ignore_first_x_items; i < 42; ++i){
        send_item(target,i,amount_to_send);
    }
}