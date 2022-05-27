class AIBlockCreator
{
	constructor()
	{
		this.onetime = true;
	}	


	update(musicBlocks)
	{
		// Set up some anchors for where we will spawn blocks from... 
		let anchor1 = {"x": 20, "y": 20};
		let anchor2 = {"x": workspaceX + workspaceWidth - 20, "y": workspaceY - 80};
		let anchor3 = {"x": workspaceX - 80, "y": workspaceY + workspaceHeight + 40};
		
		// Draw these (useful for debugging)
		fill(255,0,0)
		rect(anchor1.x, anchor1.y, 10, 10)
		rect(anchor2.x, anchor2.y, 10, 10)
		rect(anchor3.x, anchor3.y, 10, 10)


		// TODO: if 25 seconds do the stuff in here
		if (keyIsDown(LEFT_ARROW) && this.onetime === true) 
		{
			// For the top right 
			musicBlocks.push (new AIBlock (anchor1.x, anchor1.y, 200, 100));
			musicBlocks.push (new AIBlock (anchor1.x + random(230,140), 
										   anchor1.y + random(-10, 30), 200, 100));
			musicBlocks.push (new AIBlock (anchor1.x + random(0,30), anchor1.y + random(80,110), 200, 100));
			musicBlocks.push (new AIBlock (anchor1.x + random(0,30), anchor1.y + random(180,210), 200, 100));
			// musicBlocks.push (new AIBlock (anchor1.x, anchor1.y, 200, 100));
   			this.onetime=false;
  		}

	}
}