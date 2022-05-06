
function upgradeWeapon(item_name = "", to_level = 7, debug = true){
    if (item_name === ""){
        game_log("Upgrade item by using: upgradeWeapon(\"item name\", desired item level", "blue");
        return;
    }
    target_item = locate_item(item_name);
    // Not sure where to go.
}