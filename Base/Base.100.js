
function load_all_code(debug = true){
    if(debug == true){game_log("Loaded all code!", "gray")}
    // HP/MP module
    load_code("HP_MP_Manager");
    // Server Hopping Script
    load_code("Realm_Hopper");
}
