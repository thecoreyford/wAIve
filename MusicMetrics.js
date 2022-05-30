class MusicMetrics
{
	// We take the play button to help generate note sequences
	constructor (playButton)
	{
		this.playButton = playButton;
	}

	calculateGetNotes()
	{
		processDataset() //< collect all the blocks into the dataset. 

		// Find all start blocks 
		var startBlocks = data.filter (function(d) {return d["leftConnection"] === null;});
		startBlocks = startBlocks.filter (function(d) {return d["x"] >= workspaceX;});
		startBlocks = startBlocks.filter (function(d) {return d["y"] >= workspaceY;});
		startBlocks = startBlocks.filter (function(d) {return d["x"] < workspaceX+workspaceWidth;});
		startBlocks = startBlocks.filter (function(d) {return d["y"] < workspaceY+workspaceHeight;});

		// Empty the buffer! 
		var buffer = []; 

		// For each of the found start blocks...
		for (let i = 0; i < startBlocks.length; ++i)
		{
			var current = startBlocks[i]["block"];
			var previous;
			do
			{
				// push to list 
				buffer.push(this.playButton.gridArrayToNoteSequence(current.getGridArray()));
				
				// step to the next node in list
				previous = current;
				current = current.nextBlock;
			} while (current != null)
		}	
	}
}