class AIBlock extends MusicBlock
{
	constructor(x, y, width, height)
	{
		super(x, y, width, height)

		// Randomly select from generated data 
		let ai_data = generated_data[Math.floor(Math.random() * 548)]
		print(ai_data['name'])
		this.grid.setInternalButtonsFromBoolArray(ai_data['music_grid']);
	}

	show() 
  	{
	    image(puzzle_image2, this.x, this.y, this.width, this.height);

	    // copied over from music block
	    if (this.showHighlight === true){
	    	let highlightColour = color(yellow);
  			highlightColour.setAlpha(80);
  			fill(highlightColour);
  			rect(this.x - 5, this.y - 2.5, this.width + 5, this.height + 5, 10);
	    }
	}
}