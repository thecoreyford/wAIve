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
		if (a.startTime < b.startTime)
		{
    		return -1;
  		}
  		
  		if (a.startTime > b.startTime)
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
				let sequence; //< have a sequence 

				// push to list 
				if (this.buffer[0] === undefined) {
					sequence = this.playButton.gridArrayToNoteSequence (current.getGridArray());

				} else {
					sequence = this.playButton.gridArrayToNoteSequence (current.getGridArray());
				}

				for(let j = 0; j < sequence.notes.length; j++)
				{
					this.buffer.push (sequence.notes[j]);
				}
				
				// step to the next node in list
				previous = current;
				current = current.nextBlock;
			} while (current != null)
		}	

		
		this.buffer = this.buffer.sort (this.compareStartTimes)
		
		this.getPitchCount()
	}

	getPitchCount()
	{
		let previous = [];
		for (let i = 0; i <  this.buffer.length; ++i)
		{
			if (!previous.includes (this.buffer[i].pitch))
			{
				previous.push (this.buffer[i].pitch);
			}
		}

		return previous.length;
	}
}



