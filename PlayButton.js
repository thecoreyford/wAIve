class PlayButton
{
	constructor (x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.player = new mm.Player();

		this.midiBuffer = [];
		this.playhead = 0; 
		this.mode = "STOPPED"; // "PREPARE_BUFFER" || "PLAYING"
	}

	draw()
	{
		if (this.mode === "PLAYING" || this.mode === "PREPARE_BUFFER") 
		{
			fill (red);
		}
		else
		{
			fill (green);
		}
		
		rect (this.x, this.y, this.width, this.height);
	}

	updatePlayback()
	{
		if (this.playhead >= this.midiBuffer.length)
		{
			this.mode = "STOPPED";
			this.playhead = 0; 
		}

		if (this.mode === "PREPARE_BUFFER")
		{
			let totalNotes = {notes: [], totalTime: 4};
			for (let i = 0; i < this.midiBuffer[this.playhead].length; ++i) 
			{
				// Combine the notes vertically for the blocks 
				for(let notes = 0; notes < this.midiBuffer[this.playhead][i]["notes"].length; ++notes)
				totalNotes["notes"].push(this.midiBuffer[this.playhead][i]["notes"][notes]);
			}


			this.player.start(totalNotes); //< Plays the first start buffer chunk 
			this.mode = "PLAYING";
		}

		if (this.mode === "PLAYING" && !this.player.isPlaying())
		{
			this.playhead += 1;
			this.mode = "PREPARE_BUFFER";
		}

	}

	mousePressed()
	{
		if (mouseX >= this.x 
		    && mouseX <= this.x+this.width
		    && mouseY >= this.y
		    && mouseY <= this.y+this.height)
		{

			if (this.player.isPlaying())
			{
				this.player.stop();
				this.mode = "STOPPED";
			}
			else
			{
				this.startPlayback();
			}
		}
	}

	startPlayback()
	{
		processDataset() //< collect all the blocks into the dataset. 

		// Find start blocks (filter example)
		var startBlocks = data.filter(function(d) 
		{ 
			return d["leftConnection"] == null; 
		});

		this.midiBuffer = []; // Empty the buffer! 

		// For each of the found start blocks...
		for (let i = 0; i < startBlocks.length; ++i)
		{
			var index = 0; //< keep track of the buffer index
			

			var current = startBlocks[i]["block"];
			var previous;//startBlocks[i]["block"];

			do
			{
				if (this.midiBuffer[index] !== undefined) 
				{
					// index exists 
					this.midiBuffer[index].push(this.gridArrayToNoteSequence(current.getGridArray()));
				}
				else
				{
					// index doesn't exist, so create the array 
					// for this chunk in the buffer 
					this.midiBuffer.push([this.gridArrayToNoteSequence(current.getGridArray())]);
				}

				// step to the next node in list
				previous = current;
				current = current.nextBlock;
				index += 1;
			} while (current != null)
		}


		// Start the beautiful music... 
		this.playhead = 0; 
		this.mode = "PREPARE_BUFFER";
	}

	
	gridArrayToNoteSequence (gridArray)
	{
		// TODO: Hard-coding here is bad, but as we need the note 
		// list this will suffice for now.!

		let noteSequence = {notes: [], totalTime: 4};

		let counter = 0; 
		for (let col = 0; col < 8; ++col) // column
		{
  			for (let row = 0; row < 8; ++row) // row 
  			{
  				let midiPitch = [72, 71, 69, 67, 65, 64, 62, 60];
  				let midiStartTime = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
  				let midiEndTime = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

  				if (gridArray[counter].isOn === true)
  				{
  					noteSequence["notes"].push({pitch: midiPitch[row], 
  												startTime: midiStartTime[col], 
  												endTime: midiEndTime[col]});
  				}

  				counter++;
  			}
  		}

  		return noteSequence;	
	}

	//===========================================================================

}