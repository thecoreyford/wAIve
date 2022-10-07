/** AI tool which spawns blocks into the interface. */
class AIBlockCreator
{
	/** 
	 * Constructor
	 * @return {void} Nothing.
	 */
	constructor()
	{
		this.onetime = true;
	}	


	/**
 	 * Blocks to draw on update, spawning AI blocks where needed. 
	 * @param {array} musicBlocks - the music block array which holds all the blocks in the project.
 	 * @return {void} Nothing
 	 */
	update(musicBlocks)
	{
		// Set up some anchors for where we will spawn blocks from... 
		let anchor1 = {"x": 0, "y": 0};
		let anchor2 = {"x": workspace.getX() + workspace.getWidth() + 30, "y": workspace.getY() - 200};
		let anchor3 = {"x": workspace.getX() - 80, "y": workspace.getY() + workspace.getHeight() + 40};

		// Find AI blocks in the grey
		processDataset();
		var aiBlocks = data.filter(function(d){return d["isAI"] === true;});
		aiBlocks = aiBlocks.filter(function(d){return d["x"] < workspace.getX() 
													  || d["x"] > workspace.getX()+workspace.getWidth()
													  || d["y"] < workspace.getY()
													  || d["y"] > workspace.getY() + workspace.getHeight()});

		// Remove AI blocks
		for (let i =  0; i < aiBlocks.length; ++i) {
			musicBlocks.splice(musicBlocks.indexOf(aiBlocks[i].block), 1);
		}


		// Calculate the metrics for the users current data 
		// musicMetrics.calculateMusicalDistancesForData(); 


		// // For the top left (PITCH COUNT)
		var values = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 40);
		values = musicMetrics.getMostSimiliarValues("pitchRange", values, 30);	
		// values = musicMetrics.getMostSimiliarValues("averagePitchInterval", values, 20);					
		values = musicMetrics.getMostColourValues(orange, values, 20);
		musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random(0,5), 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor1.x + random (230, 220), anchor1.y, 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random (100, 120), 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// // // For the top left (AVERAGE PITCH)
		// var values = musicMetrics.getMostSimiliarValues("averagePitch");			
		// musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random(0,5), 200, 100,
		// 							   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// musicBlocks.push (new AIBlock (anchor1.x + random (230, 220), anchor1.y, 200, 100,
		// 							   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random (100, 120), 200, 100,
		// 							   values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// //// For the top right (PITCH RANGE)
		// // var values = musicMetrics.getMostSimiliarValues("pitchRange");	
		var values = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 40);
		values = musicMetrics.getMostSimiliarValues("pitchRange", values, 30);	
		// values = musicMetrics.getMostSimiliarValues("averagePitchInterval", values, 20);					
		values = musicMetrics.getMostColourValues(googGreen, values, 20);				
		musicBlocks.push (new AIBlock (anchor2.x - 300, anchor2.y - random(40, 30), 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor2.x - 80, anchor2.y - random (25, 30), 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor2.x - 25, anchor2.y + 75, 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// // // For the bottom left (AVERAGE PITCH INTERVAL)
		// var values = musicMetrics.getMostSimiliarValues("averagePitchInterval");					
		var values = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 40);
		values = musicMetrics.getMostSimiliarValues("pitchRange", values, 30);	
		// values = musicMetrics.getMostSimiliarValues("averagePitchInterval", values, 20);					
		values = musicMetrics.getMostColourValues(purple, values, 20);				
		musicBlocks.push (new AIBlock (anchor3.x - 30, anchor3.y - 350, 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor3.x - 33, anchor3.y - random (250, 200), 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
		musicBlocks.push (new AIBlock (anchor3.x - random(-30,-15) - 40, anchor3.y - random(80,120), 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
	}
}