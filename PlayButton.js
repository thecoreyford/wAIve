class PlayButton
{
	constructor (x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.player = new mm.Player();

		this.mode = "STOPPED"; 

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

			if (this.mode == "PLAYING")
			{
				this.player.stop();
				this.mode = "STOPPED";
			}
			else
			{
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

				this.mode = "PLAYING";
				this.player.start(twinkle);
			}
		}
	}
	
}