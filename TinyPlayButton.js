/** A play button which triggers to the larger play button class, to playback snippets of audio for a block..*/
class TinyPlayButton
{
	/**
 	 * Constructor
	 * @param {number} x - top left x co-ordinate for play button's block
	 * @param {number} y - top left y co-ordinate for play button's block
	 * @param {number} w - width of play button's block
	 * @param {number} h - height of play button's block
	 * @param {int} id - unique identifier for the block this tiny play button belongs to.
 	 * @return {void} Nothing
 	 */
	constructor(x,y,w,h,id)
	{
		this.x = x + 10; 
		this.y = y + 6; 
		this.width = 20; 
		this.height = 20;
		this.id = id;
	}

	/**
 	 * Constructor
	 * @param {number} x - top left x co-ordinate for play button's block
	 * @param {number} y - top left y co-ordinate for play button's block
	 * @param {number} w - width of play button's block
	 * @param {number} h - height of play button's block
	 * @param {int} id - unique identifier for the block this tiny play button belongs to.
 	 * @return {void} Nothing
 	 */
	draw(x,y,w,h)
	{
		// update pos
		this.x = x + 10; 
		this.y = y + 6; 
		// this.width = 20; 
		// this.height = 20; 

		// draw the mini playback button.
		fill(green);
		rect(this.x, this.y, this.width, this.height,4);
		fill(255);
		triangle(this.x+5, this.y+3, 
				 this.x+20-3, this.y+10,
				 this.x+5, this.y+18);
	}

	/**
 	 * If clicked, play block with said ID.
 	 * @return {void} Nothing
 	 */
	onClicked()
	{
		if (mouseX > this.x 
			&& mouseX < this.x + this.width 
			&& mouseY > this.y 
			&& mouseY < this.y + this.height) {
			playButton.startPlayback(this.id);
		}
	}
}