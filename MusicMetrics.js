class MusicMetrics
{
	// We take the play button to help generate note sequences
	constructor (playButton)
	{
		this.playButton = playButton;
		this.buffer = [];
		this.pitchesInPeice = [];
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
		
		this.getAveragePitchInterval()
	}

	getPitchCount()
	{
		this.pitchesInPeice = [];
		for (let i = 0; i <  this.buffer.length; ++i)
		{
			if (!this.pitchesInPeice.includes (this.buffer[i].pitch))
			{
				this.pitchesInPeice.push (this.buffer[i].pitch);
			}
		}

		return this.pitchesInPeice.length;
	}

	getPitchRange()
	{
		getPitchCount() //< to update pitches in piece

		return Math.abs(Math.max(this.pitchesInPeice) - Math.min(this.pitchesInPeice))
	}

	getAveragePitchInterval()
	{
		// Collect the start times in the piece
		var startTimesInPiece = [];
		for (let i = 0; i <  this.buffer.length; ++i)
		{
			if (!startTimesInPiece.includes (this.buffer[i].startTime))
			{
				startTimesInPiece.push (this.buffer[i].startTime);
			}
		}


		// Get the array of pitch intervals
		var pitchIntervals = [];
		for (let i = 0; i < startTimesInPiece.length - 1; ++i)
		{
			let curr = this.buffer.filter (function(d) {return d["startTime"] === startTimesInPiece[i];});
			let next = this.buffer.filter (function(d) {return d["startTime"] === startTimesInPiece[i+1];});

			for (let c = 0; c < curr.length; ++c)
			{
				for (let n = 0; n < next.length; ++n)
				{
					pitchIntervals.push (Math.abs (curr[c].pitch - next[n].pitch));
				}
			}

		}
		
		// calculate average 
		const sum = pitchIntervals.reduce((a, b) => a + b, 0);
		const avg = (sum / pitchIntervals.length) || 0;

		return avg
	}

}



