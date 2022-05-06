// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
reduce_cooldown(80);
var attack_mode=true;
var timeout=0
var overflow = 0;
var monster_targets = 2;
// target 1
var monster_choice = "osnake";
// target 2
var secondary_monster = "snake";
// target 3
var third_monster = "squig";
var max_atk_choice = 192;
var minxp = 0;

// Load all code through base
load_code("base");
load_all_code();


setInterval(function(){
	
	use_all_loops();

	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({type:monster_choice,max_att:max_atk_choice,min_xp:minxp});
if(!target && monster_targets >= 2) target=get_nearest_monster({type:secondary_monster,max_attk:max_atk_choice});
if(!target && monster_targets >= 3) target=get_nearest_monster({type:third_monster,max_attk:max_atk_choice});
		
		if(!target && overflow < 90) {
			target=get_nearest_monster({type:monster_choice,max_att:max_atk_choice});
			overflow++;
			set_message("Overflow: " + overflow);
		}
		// Switch servers if cant find monster.
		else if(!target){ hop(); }
		
		
		
		if(target) change_target(target);
	}
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
		
		if(character.x+(target.x-character.x) > 400 || character.y+(target.y-character.y) > 400){
			timeout++;
		} else {
			timeout = 0;
		}
		if (timeout > 12){
			change_target();
			timeout = 0;
		}
	}

},1000/6); // Loops every 1/6 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
