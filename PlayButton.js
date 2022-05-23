class PlayButton
{
	constructor (x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.player = new mm.Player();
	}

	draw()
	{
		// Change button colour based on current 
		// playback status... 
		if (this.player.isPlaying()) 
		{
			fill (red);
		}
		else
		{
			fill (green);
		}
		
		rect (this.x, this.y, this.width, this.height);
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
		var startBlocks = data.filter(function(d) { 
			return d["leftConnection"] == null; 
		});
		
		
		// Create a buffer to store each vertical step
		var buffer = []; //< move to private variable for real time playback!.... 

		// For each of the found start blocks...
		for (let i = 0; i < startBlocks.length; ++i)
		{
			var index = 0; //< keep track of the buffer index
			

			var current = startBlocks[i]["block"];
			var previous;//startBlocks[i]["block"];

			do
			{
				if (buffer[index] !== undefined) 
				{
					// index exists 
					buffer[index].push(this.gridArrayToNoteSequence(current.getGridArray()));
				}
				else
				{
					// index doesn't exist, so create the array 
					// for this chunk in the buffer 
					buffer.push([this.gridArrayToNoteSequence(current.getGridArray())]);
				}

				// step to the next node in list
				previous = current;
				current = current.nextBlock;
				index += 1;
			} while (current != null)
		}



		let twinkle = {
		  	notes: [
		    	{pitch: 60, startTime: 0.0, endTime: 0.5},
		    	{pitch: 60, startTime: 0.5, endTime: 1.0},
		    	{pitch: 67, startTime: 1.0, endTime: 1.5},
		    	{pitch: 67, startTime: 1.5, endTime: 2.0},
		    	{pitch: 69, startTime: 2.0, endTime: 2.5},
		    	{pitch: 69, startTime: 2.5, endTime: 3.0},
		    	{pitch: 67, startTime: 3.0, endTime: 4.0},
		    	{pitch: 65, startTime: 4.0, endTime: 4.5},
		    	{pitch: 65, startTime: 4.5, endTime: 5.0},
		    	{pitch: 64, startTime: 5.0, endTime: 5.5},
		    	{pitch: 64, startTime: 5.5, endTime: 6.0},
		    	{pitch: 62, startTime: 6.0, endTime: 6.5},
		    	{pitch: 62, startTime: 6.5, endTime: 7.0},
		    	{pitch: 60, startTime: 7.0, endTime: 8.0},  
		  	],
	  		totalTime: 8
		};


		// Start the beautiful music... 
		this.player.start(buffer[0][0]); //< Plays the first start buffer chunk 
	}

	
	gridArrayToNoteSequence (gridArray)
	{
		// TODO: Hard-coding here is bad, but as we need the note 
		// list this will suffice for now.!

		let noteSequence = {notes: [], totalTime: 4};

		console.log(gridArray);
		let counter = 0; 
		for (let col = 0; col < 8; ++col) //column
		{
  			for (let row = 0; row < 8; ++row) //row 
  			{
  				let midiPitch = [72, 71, 69, 67, 65, 64, 62, 60];
  				let midiStartTime = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
  				let midiEndTime = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

  				if (gridArray[counter].isOn === true){
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