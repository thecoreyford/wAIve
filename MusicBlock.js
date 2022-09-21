/** A draggable puzzle-shaped block where users can write music.*/
class MusicBlock
{
	/**
 	 * Constructor
	 * @param {number} x - top left x co-ordinate of the block
	 * @param {number} y - top left y co-ordinate of the block
	 * @param {number} width - width of the block
	 * @param {number} height - height of the block
 	 * @return {void} Nothing
 	 */
	constructor (x, y, width, height)
	{
		this.dragging = false; // Is the object being dragged?

	    this.x = x;
	    this.y = y;
	    this.width = width; 
	    this.height = height;

	    this.grid = new MusicGrid(this.x, this.y, this.width, this.height);
	   	this.grid.update(this.x, this.y, this.width, this.height);

	   	// connections 
	   	this.nextBlock = null;
	   	this.previousBlock = null;

	   	// playback feedback; 
	   	this.showHighlight = false; 

	   	this.isAI = false;

	   	// Assign a unique ID and then increment. 
	   	this.id = blockIDTracker;
	   	blockIDTracker = blockIDTracker + 1;
	}

	//=================================================================	

	// WRAPPER FOR DRAG LOGIC: 

	/**
 	 * Wapper for updates for drawing the block to the screen.
 	 * @return {void} Nothing
 	 */
	draw()
	{
		this.update();
		this.show();

		this.grid.draw();
	}

	/**
 	 * Wrapper for updates for when the mouse is pressed.
 	 * @return {void} Nothing
 	 */
	mousePressed()
	{
		this.pressed();
		this.grid.mousePressed();
	}

	/**
 	 * Wrapper for updates for when the mouse is released. 
 	 * @return {void} Nothing
 	 */
	mouseReleased()
	{
		this.released();
	}

	//=================================================================

	// DRAG LOGIC:
	// Taken from Shiffman. See https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88 .

	/**
 	 * Updates block's if they are dragged.
 	 * @return {void} Nothing
 	 */
	update() 
	{
	    // Adjust location if being dragged
	    if (this.dragging) 
	    {

	    	// undo block connections
			  if (this.previousBlock != null)
			  {
			  	  this.previousBlock.nextBlock = null
			  	  this.previousBlock = null
			  }

		      this.x = mouseX + this.offsetX;
		      this.y = mouseY + this.offsetY;
		      this.grid.update(this.x, this.y, this.width, this.height);
		      
		      this.updateNeighbours();
	    }
  	}

	/**
 	 * Checks any leftmost blocks connected to this current block and updates their position.
 	 * @return {void} Nothing
 	 */
  	updateNeighbours()
  	{
  		var current = this.nextBlock;
  		var previous = this;

  		while(current != null)
  		{
			current.x = previous.x + previous.width - 18;
			current.y = previous.y;
			current.grid.update(current.x, current.y, current.width, current.height);

			// step to the next node in list
			previous = current;
			current = current.nextBlock;
  		}
  		
  	}

	/**
 	 * Draws block to canvas, checking its transparency. 
 	 * @return {void} Nothing
 	 */
  	show() 
  	{
  		if (this.x < workspaceX 
  			|| this.x > workspaceX+workspaceWidth 
  			|| this.y < workspaceY 
  			|| this.y > workspaceY + workspaceHeight)
  		{
  			// Block is outside of the workspace so lets make transparent 
  			tint (255, 126);
  			this.grid.toggleTransparency(true);
  		}
  		else
  		{
  			tint (255, 255);
  			this.grid.toggleTransparency(false);
  		}
  		

	    image(puzzle_image, this.x, this.y, this.width, this.height);

	    if (this.showHighlight === true){
	    	let highlightColour = color(yellow);
  			highlightColour.setAlpha(80);
  			fill(highlightColour);
  			rect(this.x - 5, this.y - 2.5, this.width + 5, this.height + 5, 10);
	    }

	    // ellipse(this.x + 180, this.y, 10, 10);
	    // ellipse(this.x + this.width, this.y, 10, 10);
	    // ellipse(this.x + 180, this.y + this.height, 10, 10);
	   	// ellipse(this.x + this.width, this.y + this.height, 10, 10);

	}

	/**
 	 * On pressed, sets the offset values for where the mouse has selected the block. 
 	 * @return {void} Nothing
 	 */
	pressed() 
	{
	    // Did I click on the rectangle?
	    if (mouseX > this.x 
	    	&& mouseX < this.x + this.width 
	    	&& mouseY > this.y 
	    	&& mouseY < this.y + this.height
	    	&& this.grid.hasMouseOver() === false) {
			
			// Start dragging
			this.dragging = true;

			// If so, keep track of relative location 
			// of click to corner of rectangle
			this.offsetX = this.x - mouseX;
			this.offsetY = this.y - mouseY;
	    }
	}

	/**
 	 * Stops dragging.
 	 * @return {void} Nothing
 	 */
  	released() 
  	{
    	this.dragging = false; // Quit dragging
  	}

  	//=================================================================

  	// CONNECTION LOGIC 

	/**
 	 * Getter for the leftmost rectangle (bumps) of the block.
 	 * @return {array} the x, y, width and height of the top left of the block.
 	 */
  	getLeftPoints() 
  	{
  		// both top then both bottom, left to right
	    return [this.x, this.y, 
	    		this.x + 20, this.y,
	    		this.x, this.y + this.height,
	    		this.x + 20, this.y + this.height];
  	}

	/**
 	 * Getter for the rightmost rectangle (bumps) of the block.
 	 * @return {array} the x, y, width and height of the top right of the block.
 	 */
  	getRightPoints() 
  	{
  		// both top then both bottom, left to right
	    return [this.x + 180, this.y, 
	    		this.x + this.width, this.y,
	    		this.x + 180, this.y + this.height,
	    		this.x + this.width, this.y + this.height,];
  	}

	/**
 	 * Checks if puzzle piece ends overlap. If so returns true. 
 	 * @param {object} other - a second adjacent block which could overlap.
 	 * @return {bool} true is puzzle peices overlap
 	 */
  	shouldMakeConnection(other) 
  	{
  		// Very helpful site here: https://www.geeksforgeeks.org/find-two-rectangles-overlap/
  		
  		let rx1 = this.getLeftPoints()[0];
  		let ry1 = this.getLeftPoints()[1];
  		let rx2 = this.getLeftPoints()[6];
  		let ry2 = this.getLeftPoints()[7];

  		let lx1 = other[0];
  		let ly1 = other[1];
  		let lx2 = other[6];
  		let ly2 = other[7];

    	if ( lx1 < rx2 
    		 && lx2 > rx1 
    		 && ly1 < ry2 
    		 && ly2 > ry1 )
        {   
    		return true;
    	}

		return false;
  	}

  	/**
 	 * Setter for the next block.
 	 * @param {object} - the new connection for this block's neighbour
 	 * @return {void} Nothing.
 	 */
  	setNextBlock(newConnection) 
  	{
  		this.nextBlock = newConnection;
  	}

	/**
 	 * Setter for the block's left connection.
 	 * @param {object} - the new connection for this block's leftmost neighbour.
 	 * @return {void} Nothing.
 	 */
  	setLeftConnection(newConnection)
  	{
		this.previousBlock = newConnection; 
	}

	/**
 	 * Setter for the block's right connection.
 	 * @param {object} - the new connection for this block's rightmost neighbour.
 	 * @return {void} Nothing.
 	 */
	setRightConnection(newConnection)
	{
		this.nextBlock = newConnection; 
	}

	/**
 	 * Getter for the block's left connection.
 	 * @return {object} the connection for this block's leftmost neighbour.
 	 */
	getLeftConnection()
	{
		return this.previousBlock; 
	}

	/**
 	 * Getter for the block's right connection.
 	 * @return {object} the connection for this block's rightmost neighbour.
 	 */
	getRightConnection()
	{
		return this.nextBlock; 
	}

	/**
 	 * Getter for the block's music grid.
 	 * @return {object} the music grid ontop of the block.
 	 */
	getGridArray()
	{
		return this.grid.getInternalButtonsArray();
	}

}