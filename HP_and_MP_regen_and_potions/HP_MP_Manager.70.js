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

// if debug = true, this will print game_log updates.
function check_hp_and_mp(debug = true, focus = "both", hp_thresh = 0.85, mp_thresh = 0.2, ratio = 3){
    if(!(is_on_cooldown("regen_hp") || is_on_cooldown("regen_mp"))){
        // Checks to see if either hp or mp is below threshhold. If it is, it uses a potion.
        if(!is_on_cooldown("regen_hp") && (character.hp < (character.max_hp * hp_thresh) || character.mp < (character.max_mp * mp_thresh))) {
            // Uses game's built-in use potion function.
            // need to update this.
            use_hp_or_mp();
            if (debug == true) {
                game_log("Used a potion.", "white");
                return;
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
                game_log("Iterated mp count: " + check_hp_mp_count);
            } else {
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
                game_log("Iterated hp count: " + check_hp_mp_count);
                return;
            } else {
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