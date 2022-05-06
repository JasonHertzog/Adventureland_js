
function load_all_code(debug = true){
    if(debug == true){game_log("Loaded all code!", "gray")}
    // HP/MP module
    load_code("HP_MP_Manager");
    // Server Hopping Script
    load_code("Realm_Hopper");
}

function use_all_loops(debug = true){
    // Looting happens every tick.
    loot();
    // Uses HP & MP Manager every tick.
    check_hp_and_mp(debug, "both");

}