class AIBlockCreator
{
	constructor()
	{
		this.onetime = true;
	}	


	update(musicBlocks)
	{

		//TODO: Come back and tweak these further... 
		
		// Set up some anchors for where we will spawn blocks from... 
		let anchor1 = {"x": 10, "y": 10};
		let anchor2 = {"x": workspaceX + workspaceWidth, "y": workspaceY - 80};
		let anchor3 = {"x": workspaceX - 80, "y": workspaceY + workspaceHeight + 40};
		
		
		// // Draw these (useful for debugging)
		// fill(255,0,0)
		// rect(anchor1.x, anchor1.y, 10, 10)
		// rect(anchor2.x, anchor2.y, 10, 10)
		// rect(anchor3.x, anchor3.y, 10, 10)


		let elapsedTime = millis() - startTime; 
		
		if (elapsedTime > (25 * 1000)) 
		{

			// TODO: this will currently take some of the most similar values 


			// pitchCountDist
			// pitchRangeDist
			// averagePitchIntervalDist
			musicMetrics.calculateMusicalDistancesForData(); //TODO: we want this to return a timestamped list of notes 


			// // For the top left (PITCH COUNT)
			var values = musicMetrics.getMostSimiliarValues("pitchCount");			
			musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random(0,5), 200, 100,
										   values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor1.x + random (230, 220), anchor1.y, 200, 100,
										   values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor1.x, anchor1.y + random (100, 120), 200, 100,
										   values[Math.floor(Math.random()*values.length)]["music_grid"]));

			// // For the top right (PITCH RANGE)
			var values = musicMetrics.getMostSimiliarValues("pitchRange");			
			musicBlocks.push (new AIBlock (anchor2.x - 300, anchor2.y - random(30, 20), 200, 100,
										    values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor2.x - 80, anchor2.y - random (25, 30), 200, 100,
										    values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor2.x - 50, anchor2.y + 60, 200, 100,
										    values[Math.floor(Math.random()*values.length)]["music_grid"]));

			// // For the bottom left (AVERAGE PITCH INTERVAL)
			var values = musicMetrics.getMostSimiliarValues("averagePitchInterval");			
			musicBlocks.push (new AIBlock (anchor3.x - 30, anchor3.y - 30, 200, 100,
											values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor3.x + 200, anchor3.y - random (20, 40), 200, 100,
											values[Math.floor(Math.random()*values.length)]["music_grid"]));
			musicBlocks.push (new AIBlock (anchor3.x - random(0,20), anchor3.y - random(100,150), 200, 100,
											values[Math.floor(Math.random()*values.length)]["music_grid"]));

   			startTime = millis();
  		}	

	}
}