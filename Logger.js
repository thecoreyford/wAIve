/** Wrapper for the data logger object. */
class Logger
{
	constructor()
	{

	}

	log()
	{

	}

	save()
	{
		// Take what we need from the music blocks array.
		// We have to take this more cautious approach so we 
		// don't get into trouble with circular includes
		// i.e. next block points to a block itself... . 
		
		let myBlockArray = [];
		for (let i = 0; i < musicBlocks.length; ++i)
		{
			// get a boolean array for the toggle buttons
			let toggleArray = [];
			for (let j = 0; j < musicBlocks[i].grid.toggleButtons.length; ++j){
				if(musicBlocks[i].grid.toggleButtons[j].isOn === true){
					toggleArray.push(1)
				}else{
					toggleArray.push(0)
				}
			}

			// push to the main array 
			myBlockArray.push({x: musicBlocks[i].x, 
							   y: musicBlocks[i].y, 
							   width: musicBlocks[i].width, 
							   height: musicBlocks[i].height, 
							   musicGrid: toggleArray, 
							   id: musicBlocks[i].id, 
							   isAI: musicBlocks[i].isAI});
		}



		// Stringify in a JSON format... 
		var JsonObject = JSON.stringify(myBlockArray);

		// Write to file... 
		console.log(JsonObject);
	}
}