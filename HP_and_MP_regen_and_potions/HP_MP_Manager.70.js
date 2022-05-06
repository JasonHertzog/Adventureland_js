// EXAMPLE
// check_hp_and_mp("true", "hp", 0.85, 0.2. 3);
// parameters: debug, focus, hp_thresh, mp_thresh, ratio
//  debug: true = print messages to game log. false = do not print messages to game log.
//  focus: "hp" = healing is prioritized. "mp" = mana is prioritized. "both" equal priority
//          NOTE: "both" ignores ratio
//  hp_thresh exmple: with a 1000 max hp, 0.85 = 850 hp left before using a healing potion.
//  mp_thresh example: with 100 max mp, 0.2 = 200 mp remaining before using a mana potion.
//  ratio: used to determine how many regens to use before using secondary regen.

// count is used to maintain the ratio.
check_hp_mp_count = 0;
// Set initial choice of mp or hp regen, which defaults to HP.
check_hp_mp_choice = 1;




function use_hp_or_mp_custom(hp_threshold, mp_threshold)
{
	if(safeties && mssince(last_potion)<min(200,character.ping*2)) return;
	var used=true;
	if(is_on_cooldown("use_hp")) return;
	if(character.mp/character.max_mp<0.2) {
        use_skill('use_mp'); 
        game_log("Used a Mana potion.", "white");
    }
	else if(character.hp/character.max_hp<hp_threshold) {
        use_skill('use_hp');
        game_log("Used a Health potion.", "white");
    }
	else if(character.mp/character.max_mp<mp_threshold) {
        use_skill('use_mp')
        game_log("Used a Mana potion.", "white");
    }
	else if(character.hp<character.max_hp) {
        use_skill('use_hp');
        game_log("Used a Health potion.", "white");
    } 
	else if(character.mp<character.max_mp) {
        use_skill('use_mp');
        game_log("Used a Mana potion.", "white");
    } 
	else used=false;
	if(used) last_potion=new Date();
}



// Checks to see how many HP potions you have.
function check_hp_potion_count(debug = true){
    // initializing potion count
    hpot_sum = 0;
    // Find where potions are in inventory.
    hpot_small_loc = locate_item("hpot0");
    hpot_med_loc = locate_item("hpot1");
    
    // Search each location, if possible, and add the values.
    if (hpot_small_loc != -1){
        hpot_sum += character.items[hpot_small_loc].q;
    }
    if (hpot_med_loc != -1){
        hpot_sum += character.items[hpot_med_loc].q;
    }

    if (debug == true) {
        game_log("Health potions: " + hpot_sum, "white");
    }
    return hpot_sum;
}

// Checks to see how many mana potions you have.
function check_mp_potion_count(debug = true){
    // initialize potion values.
    mpot_sum = 0;
    // Find where potions are in inventory.
    mpot_small_loc = locate_item("mpot0");
    mpot_med_loc = locate_item("mpot1");
    
    // Search each location, if possible, and add the values.
    if (mpot_small_loc != -1){
        mpot_sum += character.items[mpot_small_loc].q;
    }
    if (mpot_med_loc != -1){
        mpot_sum += character.items[mpot_med_loc].q;
    }
    if (debug == true) {
        game_log("Mana potions: " + mpot_sum, "white");
    }
    return mpot_sum;
}


// if debug = true, this will print game_log updates.
function check_hp_and_mp(debug = true, focus = "both", hp_thresh = 0.85, mp_thresh = 0.2, ratio = 3, hp_potion_count, mp_potion_count){
    if(!(is_on_cooldown("regen_hp") || is_on_cooldown("regen_mp"))){
        // Checks to see if either hp or mp is below threshhold. If it is, it uses a potion.
        if(!is_on_cooldown("regen_hp") && (character.hp < (character.max_hp * hp_thresh) || character.mp < (character.max_mp * mp_thresh))) {
            // Calls customized hp/mp potion using function.
            use_hp_or_mp_custom(hp_thresh, mp_thresh);
            // return potion quantities.
            hp_potion_count = check_hp_potion_count(false);
            mp_potion_count = check_mp_potion_count(false);

            // Print warning when low on hp potions regardless of debug value.
            if (hp_potion_count <= 300 && (hp_potion_count % 5 == 0) || hp_potion_count < 10){
                game_log("LOW HEALTH POTIONS: " + hp_potion_count, "red");
            }
            // Print warning when low on mp potions regardless of debug value.
            if (mp_potion_count <= 300 && (mp_potion_count % 5 == 0) || mp_potion_count < 10){
                game_log("LOW MANA POTIONS: " + mp_potion_count, "red");
            }
        }

        // if prioritizing MP, regen mp (ratio) times before regenning HP.
        else if (check_hp_mp_choice == 0 && (!is_on_cooldown("regen_mp") && character.mp < character.max_mp)){
            use_skill("regen_mp");
            if (debug == true) {
                game_log("Used regen MP skill", "cyan");
            }
            // if count is still less than ratio, increment.
            if(check_hp_mp_count < ratio && focus == "mp"){
                check_hp_mp_count++;
                // game_log("Iterated mp count: " + check_hp_mp_count);
            } 
            else {
                // switch to choice 1, hp.
                check_hp_mp_choice = 1;
                // reset count.
                check_hp_mp_count = 0;
                return;
            }
        }

        // if prioritizing HP, regen hp (ratio) times before regenning HP.
        else if (check_hp_mp_choice == 1 && (!is_on_cooldown("regen_hp") && character.hp < character.max_hp)){
            use_skill("regen_hp");
            if (debug == true){
                game_log("Used regen HP skill", "pink");
            }
            // if count is still less than ratio, increment.
            if(check_hp_mp_count < ratio && focus == "hp"){
                check_hp_mp_count++;
                // game_log("Iterated hp count: " + check_hp_mp_count);
                return;
            } 
            else {
                // switch to choice 0, mp.
                check_hp_mp_choice = 0;
                // reset count.
                check_hp_mp_count = 0;
                return;
            }
        }

        // if set on both (choices are inversed)
        else if (check_hp_mp_choice == 0 && (!is_on_cooldown("regen_hp") && character.hp < character.max_hp)){
            use_skill("regen_hp");
            if (debug == true){
                game_log("Used regen HP skill", "pink");
            }
        }
            // if set on both
        else if (check_hp_mp_choice == 1 && (!is_on_cooldown("regen_mp") && character.mp < character.max_mp)){
            use_skill("regen_mp");
            if (debug == true){
                game_log("Used regen MP skill", "cyan");
            }
        }
    }
}