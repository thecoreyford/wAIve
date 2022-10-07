/**
 * @file Main file for p5js sketch.
 * @author Corey Ford
 */

//========================================================================================

// VARIABLES

const canvasWidth = 1410;
const canvasHeight = 870; //580;

const workspaceX = 125; //canvasWidth * 0.10; //125
const workspaceY = 230; //canvasHeight * 0.15; //117
const workspaceWidth = 1100; //canvasWidth - (2 * workspaceX); //1000
const workspaceHeight = 600; //canvasHeight - (2 * workspaceY); //546
var workspace  = new Workspace(workspaceX, 
							   workspaceY, 
							   workspaceWidth, 
							   workspaceHeight);


var blockCreator = new BlockCreator(workspace.getX() + 60,
									workspace.getY() + 10,
									40,
									40);

var playButton = new PlayButton(workspace.getX() + 10,
								workspace.getY() + 10,
								40,
								40);

var bin = new Bin(workspace.getX() + workspace.getWidth() + 50, 
				  117 + workspace.getHeight() + 30, 
				  70, 85);

let musicBlocks = []; //< Array of current blocks

var aiBlockCreator = new AIBlockCreator(); //< Class spawns in AI blocks

var musicMetrics = new MusicMetrics(playButton); //< NOTE: MIDI note sequences is encapsulated through the play button

var logger = new Logger();

var puzzle_image, puzzle_image2, binClosed, binOpen;

var blockIDTracker; 

var startTime;

//========================================================================================

// MAIN FUNCTIONS  

/**
 * Preloads images and other info before app launch.
 * @return {void} - Nothing.
 */
function preload() 
{
	blockIDTracker = 0;
	startTime = millis();
	puzzle_image = loadImage("assets/puzzle.png");
	puzzle_image2 = loadImage("assets/puzzle2.png");
	binClosed = loadImage("assets/binClosed.png");
	binOpen = loadImage("assets/binOpen.png");
}

/**
 * Sets up canvas before drawing to screen.
 * @return {void} - Nothing.
 */
function setup() 
{
  musicMetrics.getCountOfColour (orange, true); //< TODO: should these be in preload
  musicMetrics.getCountOfColour (purple, true);
  musicMetrics.getCountOfColour (googGreen, true);
  createCanvas (canvasWidth, canvasHeight);
}

/**
 * Timer update for drawings, updating app objects.
 * @return {void} - Nothing.
 */
function draw() 
{
	// draw background with border
	strokeWeight(1);
  	stroke(0);
  	fill(lightGrey);
  	rect(0,0,canvasWidth,canvasHeight,10);
	noStroke();

	fill(255,0,0);
	rect(workspaceX,80,workspaceWidth,130);

	// draw the following onto the background.... 
  	workspace.draw();
  	bin.draw();
  	
  	for (let i = 0; i < musicBlocks.length; ++i)
  	{
		musicBlocks[i].draw();
	}

	blockCreator.draw();
  	playButton.draw();
  	stackPlayer.draw(workspace2X,workspace2Y,40,40,-2);

  	// every so many seconds... 
  	let elapsedTime = millis() - startTime; 
	if (elapsedTime > (25 * 1000))
	{
		aiBlockCreator.update (musicBlocks);
		startTime = millis();
		logger.save();
	}

  	playButton.updatePlayback();
}

//===========================================================================

// INTERACTIVITY

/**
 * If mouse is pressed, move blocks or trigger playback.
 * @return {void} - Nothing.
 */
function mousePressed() 
{
	// If block creator is pressed
	if (blockCreator.hasMouseOver()) 
	{
		musicBlocks.push (new MusicBlock(250 + random(0, 40),
									  250 + random(-20,40),
									  200,
									  100));
	}

	// If a music block is pressed 
	for (let i = 0; i < musicBlocks.length; ++i)
	{
		musicBlocks[i].mousePressed();
	}

	// If play button is pressed
	playButton.mousePressed();
	stackPlayer.onClicked();
}

/**
 * If mouse is released, delete or stop dragging blocks.
 * @return {void} - Nothing.
 */
function mouseReleased()
{
	// delete any blocks from the bin
	bin.mouseReleased (musicBlocks);

	// If a music block is released...
	for (let i = 0; i < musicBlocks.length; ++i)
	{
		// Stop dragging
		musicBlocks[i].mouseReleased();

		for (let j = 0; j < musicBlocks.length; ++j)
		{
			if (j != i)
			{
				let lhsBlock = musicBlocks[j];
				let rhsBlock = musicBlocks[i];

				// if there is an intersection
				if (musicBlocks[i].shouldMakeConnection(musicBlocks[j].getRightPoints()))
				{
					// Reset blocks previous connections
			        if (rhsBlock.getLeftConnection() != null)
			        {
			        	rhsBlock.getLeftConnection().setRightConnection (null);
			        	rhsBlock.setLeftConnection (null);
			        }

			        if (lhsBlock.getRightConnection() != null)
			        {
			            lhsBlock.getRightConnection().setLeftConnection(null);
			            lhsBlock.setRightConnection (null);
			            // Note: did not port all the code here but this seemed to work okay; 
			            // ...fingers crossed!
			        }
		        
			        // The right blocks input should be the left block
			        rhsBlock.setLeftConnection (lhsBlock);
			        
			        // The left blocks input output should be the right block
			        lhsBlock.setRightConnection (rhsBlock);
			        
			        // Position blocks for a more aligned snap
			        lhsBlock.updateNeighbours();
				}
			}
		}
	}
}