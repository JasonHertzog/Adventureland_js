//Folder contains functions to call

function kite (target) {	
	if(getDistance(target) < 50) { // If you get too close to the target this triggers
		retreat(target); //Work in progress.
	} else {
	move( // Moves you 20% further from the target
		character.x-(target.x-character.x)/5,
		character.y-(target.y-character.y)/5
		);
	};
};

function getDistance (target){ // Gets the distance from the target
	let y = character.x - target.x;
	let x = character.y - target.y;
	let distance = Math.sqrt(x * x + y * y);
	return distance;
};

function retreat(target) { //Work in progress. The goal is to get you further from target.
		game_log("Retreating...", "yellow");
};
