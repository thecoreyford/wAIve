/** GUI Play button which also controls the playback of note block sequences.
	It also acts as the playback engine e.g. any playback triggered must go through the playback block.*/

var highlightTracker = 0;
function dynamicSort(property) {
   return function(a, b) {
       return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
   }
}


class PlayButton
{
	/**
 	 * Constructor
	 * @param {number} x - top left x co-ordinate for play button
	 * @param {number} y - top left y co-ordinate for play button
	 * @param {number} width - width of play button
	 * @param {number} height - height of play button
 	 * @return {void} Nothing
 	 */
	constructor (x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.player = new mm.Player();

		this.midiBuffer = [];
		this.highlightBuffer = [];
		this.highlights = [];
		this.mode = "STOPPED"; // "PREPARE_BUFFER" || "PLAYING"
		this.callbackObject  = {run: function()
									{
										highlightTracker++;
										draw();
									}, 
							   stop: function()
							   		 {
							   		}};
		this.player.callbackObject = this.callbackObject; 
	}

	/** 
	 * Updates the GUI of the play button based on its mode.
	 * @return {void} Nothing
	 */
	draw()
	{
		// Play button GUI
		if (this.mode === "PLAYING") 
		{
			fill (red);
		}
		else
		{
			fill (green);
		}
		
		rect (this.x, this.y, this.width, this.height, 5);

		fill(lightGrey);
		if (this.mode === "PLAYING")
		{
			rect(this.x + 7, this.y + 7, this.width * 0.66, this.height * 0.66);

			if (highlightTracker !== 0)
			{
				this.highlights[0][highlightTracker-1]["block"].showHighlight = true;
				let prev = this.highlights[0][highlightTracker-1]["block"].previousBlock;
				if (prev !== null
					&& prev.showHighlight === true) 
				{ 
					prev.showHighlight = false; 
				}
			}
		}
		else
		{
			highlightTracker = 0;
			triangle(this.x + 7, this.y + 7, 
					 this.x + this.width - 7, (this.y + this.height * 0.5),
					 this.x + 7, this.y + this.height - 7);
		}
	}

	/**
 	 * Either stop or start playback if play button is pressed. 
 	 * @return {void} Nothing
 	 */
	mousePressed()
	{
		if (mouseX >= this.x 
		    && mouseX <= this.x+this.width
		    && mouseY >= this.y
		    && mouseY <= this.y+this.height)
		{

			if (this.player.isPlaying())
			{
				this.stopPlayback();
			}
			else
			{
				this.startPlayback(-1);
			}
		}
	}

	/**
 	 * Start playback given the users current data.
 	 * 
 	 * @return {void} Nothing
 	 */
	startPlayback(id)
	{
		processDataset() //< collect all the blocks into the dataset. 

		// Empty the buffers! 
		this.highlightBuffer = [];
		this.midiBuffer = [];
		this.highlights = [[]];

		// Find start blocks (filter example)
		var startBlocks;
		if (id === -1 || id === -2)
		{
			// Count up all the start blocks and play the entire piece!!!
			startBlocks = data.filter(function(d){return d["leftConnection"] === null;});

			let workspaceID = -1;
			if (id === -1) { workspaceID = 0; } else { workspaceID = 1; }
			startBlocks = startBlocks.filter(function(d){return d["x"] >= workspace[workspaceID].getX();});
			startBlocks = startBlocks.filter(function(d){return d["y"] >= workspace[workspaceID].getY();});
			startBlocks = startBlocks.filter(function(d){return d["x"] < workspace[workspaceID].getX()+workspace[workspaceID].getWidth();});
			startBlocks = startBlocks.filter(function(d){return d["y"] < workspace[workspaceID].getY()+workspace[workspaceID].getHeight();});

			// For each of the found start blocks...
			for (let i = 0; i < startBlocks.length; ++i)
			{
				var index = 0; //< keep track of the buffer index

				var current = startBlocks[i]["block"];
				var previous;//startBlocks[i]["block"];

				do
				{
					if (this.highlightBuffer[index] !== undefined)
					{
						// add to the master buffer 
						let x = this.gridArrayToNoteSequence(current.getGridArray(), index * 4.0)["notes"];
						for(let i = 0; i < x.length; ++i) {
							this.midiBuffer[0]["notes"].push(x[i]);
							this.highlights[0].push({"block": current, 
													 "time": x[i]["startTime"]});
						};

						// index exists 
						this.highlightBuffer[index].push(current);
					}
					else
					{
						if (index === 0 /* create buffer if not there */) 
						{
							this.midiBuffer.push(this.gridArrayToNoteSequence(current.getGridArray()));

							for(let i = 0; i < this.midiBuffer[0]["notes"].length; ++i) {
								this.highlights[0].push({"block": current, 
													 "time": this.midiBuffer[0]["notes"][i]["startTime"]});
							}
						} 
						else 
						{
							let x = this.gridArrayToNoteSequence(current.getGridArray(), index * 4.0)["notes"];
							for(let i = 0; i < x.length; ++i) {
								this.midiBuffer[0]["notes"].push(x[i]);
								this.highlights[0].push({"block": current, 
													 "time": x[i]["startTime"]});
							};
							this.midiBuffer[0]["totalTime"] = (index * 4.0) + 4.0;
						}
						
						// update trackers
						this.highlightBuffer.push([current]);
					}

					// step to the next node in list
					previous = current;
					current = current.nextBlock;
					index += 1;
				} while (current != null)
			}
		}
		else
		{
			// only play the block requested! 
			startBlocks = data.filter(function(d){return d["id"] === id;});
			var current = startBlocks[0]["block"];	
			this.midiBuffer.push(this.gridArrayToNoteSequence(current.getGridArray()));
			this.highlightBuffer.push([current]);
		}		

		// Start the beautiful music... 
		if (startBlocks.length !== 0) {
			this.highlights.sort(dynamicSort('time'));
			this.mode = "START_PLAYING";
			// this.updatePlayback();
		}
	}

	/**
 	 * Given the playhead position, update the play button's current mode
 	 * @return {void} Nothing
 	 */
	updatePlayback()
	{
		if (!this.player.isPlaying() && this.mode !== "START_PLAYING")
		{
			this.mode = "STOPPED";
			this.stopPlayback();
		}

		if (this.mode === "START_PLAYING")
		{
			this.player.start(this.midiBuffer[0]);
			this.mode = "PLAYING";
		}
	}

	/**
 	 * Stops current playback and updates highlights accordingly.
 	 * @return {void} Nothing
 	 */
	stopPlayback()
	{
		this.player.stop();
		this.mode = "STOPPED";
		
		// stop highlights 
		for (let h = 0; h < musicBlocks.length; h++){
			musicBlocks[h].showHighlight = false;
		}
	}

	/**
 	 * For an array of buttons, calculated the corresponding MIDI note sequence
	 * @param {array} gridArray - an array of toggle buttons 
	 * @param {float} offset - the amount to offset note values by
 	 * @return {void} Nothing
 	 */
	gridArrayToNoteSequence (gridArray, offset = 0)
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
  				let midiStartTime = [0.0 + offset, 0.5 + offset, 1.0 + offset, 1.5 + offset, 2.0 + offset, 2.5 + offset, 3.0 + offset, 3.5 + offset];
  				let midiEndTime = [0.5 + offset, 1.0 + offset, 1.5 + offset, 2.0 + offset, 2.5 + offset, 3.0 + offset, 3.5+ offset, 4.0 + offset];

  				if (gridArray[counter].isOn === true)
  				{
  					noteSequence["notes"].push({pitch: midiPitch[row], 
  												startTime: midiStartTime[col], 
  												endTime: midiEndTime[col],
  												velocity: 20});
  				}

  				counter++;
  			}
  		}

  		return noteSequence;	
	}

}