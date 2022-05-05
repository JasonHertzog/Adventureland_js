// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true

load_code('Functions');

setInterval(function(){

	use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;
	let enemy = "Tortoise"; //Set this to the type of enemy you want to attack
	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({type:enemy,min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
		
	}else {
		getDistance(target); // Gets distance from the target.
	    kite(target); // Maintains healthy distance from target while engaged.
		
		if(can_attack(target)) {
			set_message("Attacking");
			attack(target);
		}	
	}


},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
