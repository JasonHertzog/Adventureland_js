// Set defaults to use, if desired, for the use_all_loops function.
// functions can be customized by changing their defaults arguments.

// The second argument sets check_hp_and_mp code focus to hp/mp/both
function use_all_loops(debug = true, check_hp_and_mp_focus = "both"){
    // Looting happens every tick.
    loot();
    // Uses HP & MP Manager every tick.
    // debug, focus (hp/mp/both), hp tolerance, mp tolerance, ratio for focus.
    check_hp_and_mp(debug, check_hp_and_mp_focus, 0.85, 0.2, 3);

}

function load_all_code(debug = true){
    if(debug == true){game_log("Loaded all code!", "gray")}
    // HP/MP module
    load_code("HP_MP_Manager");
    // Server Hopping Script
    load_code("Realm_Hopper");
    // Trade command script
    load_code("Trading");

    // Upgrader (for item upgrades) 
    // load_code("upgrader"); // Not finished
}