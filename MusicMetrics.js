class MusicMetrics
{
	// We take the play button to help generate note sequences
	constructor (playButton)
	{
		this.playButton = playButton;
		this.buffer = [];
	}

	compareStartTimes (a, b) 
	{
		if ( a.startTime < b.startTime )
		{
    		return -1;
  		}
  		
  		if ( a.startTime > b.startTime )
  		{
    		return 1;
  		}
  		
  		return 0;
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
		this.buffer = []; 

		// For each of the found start blocks...
		for (let i = 0; i < startBlocks.length; ++i)
		{
			var current = startBlocks[i]["block"];
			var previous;
			do
			{
				// push to list 
				if (this.buffer[0] === undefined) {
					let sequence = this.playButton.gridArrayToNoteSequence (current.getGridArray());
					this.buffer.push (sequence.notes);

				} else {
					let sequence = this.playButton.gridArrayToNoteSequence (current.getGridArray());
					this.buffer.concat (sequence.notes);
				}
				
				
				// step to the next node in list
				previous = current;
				current = current.nextBlock;
			} while (current != null)
		}	

		print(this.buffer.sort(this.compareStartTimes))
	}


}