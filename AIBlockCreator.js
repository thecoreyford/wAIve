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
		let anchor1 = {"x": 1120, "y": 110};
		let anchor2 = {"x": 1120, "y": 400};
		let anchor3 = {"x": 1120, "y": 670};

		// Find AI blocks in the grey
		processDataset ("all");
		var aiBlocks = data.filter (function(d){return d["isAI"] === true;});
		aiBlocks = aiBlocks.filter (function(d){return d["x"] < workspace[0].getX() 
													  || d["x"] > workspace[0].getX()+workspace[0].getWidth()
													  || d["y"] < workspace[1].getY()
													  || d["y"] > workspace[0].getY() + workspace[0].getHeight()});
		// Remove AI blocks
		for (let i =  0; i < aiBlocks.length; ++i) {
			musicBlocks.splice(musicBlocks.indexOf(aiBlocks[i].block), 1);
		}


		// // For the top left (PITCH COUNT)
		// Calculate the metrics for the users current data 
		musicMetrics.calculateMusicalDistancesForData(1); 
		var valuesMusic = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 50);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitch",valuesMusic, 10);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitchInterval",valuesMusic, 5);
		var values = valuesMusic;//musicMetrics.getMostColourValues(orange, valuesMusic, 8);
		musicBlocks.push (new AIBlock (anchor1.x, anchor1.y, 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(googGreen, valuesMusic, 8);
		musicBlocks.push (new AIBlock (anchor1.x + random (50, 80), anchor1.y + random(-100,-70), 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(purple, valuesMusic, 8);
		musicBlocks.push (new AIBlock (anchor1.x + random (50, 80), anchor1.y + random (60, 80), 200, 100,
									   values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// // // For the top left (AVERAGE PITCH)
		// var values = musicMetrics.getMostSimiliarValues("averagePitch");			
		// musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random(0,5), 200, 100,
									   // values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// musicBlocks.push (new AIBlock (anchor1.x + random (230, 220), anchor1.y, 200, 100,
									   // values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random (100, 120), 200, 100,
									   // values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// //// For the top right (PITCH RANGE)
		// // var values = musicMetrics.getMostSimiliarValues("pitchRange");	
		// Calculate the metrics for the users current data 
		musicMetrics.calculateMusicalDistancesForData(2); 
		valuesMusic = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 50);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitch",valuesMusic, 10);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitchInterval",valuesMusic, 5);
		values = valuesMusic; //musicMetrics.getMostColourValues(googGreen, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor2.x, anchor2.y, 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(orange, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor2.x  + random (50, 80), anchor2.y + random(-90,-70), 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(purple, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor2.x  + random (50, 80), anchor2.y + random (60, 80), 200, 100,
									    values[Math.floor(Math.random()*values.length)]["music_grid"]));

		// // // For the bottom left (AVERAGE PITCH INTERVAL)
		// var values = musicMetrics.getMostSimiliarValues("averagePitchInterval");					
		// var values = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 40);
		// values = musicMetrics.getMostSimiliarValues("pitchRange", values, 30);	
		// Calculate the metrics for the users current data 
		musicMetrics.calculateMusicalDistancesForData(3); 
		valuesMusic = musicMetrics.getMostSimiliarValues("pitchCount", generated_data, 50);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitch",valuesMusic, 10);
		valuesMusic = musicMetrics.getMostSimiliarValues("averagePitchInterval",valuesMusic, 5);
		values = valuesMusic; //musicMetrics.getMostColourValues(purple, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor3.x, anchor3.y, 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(orange, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor3.x + random (50, 80), anchor3.y + random(-60,-70), 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
		// values = musicMetrics.getMostColourValues(googGreen, valuesMusic, 8);				
		musicBlocks.push (new AIBlock (anchor3.x  - random (50, 80), anchor3.y + random (90, 90), 200, 100,
										values[Math.floor(Math.random()*values.length)]["music_grid"]));
	}
}