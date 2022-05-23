// VARIABLES

const canvasWidth = 1250;
const canvasHeight = 780; //580;

var workspace  = new Workspace(canvasWidth * 0.10, 
							   canvasHeight * 0.15, 
							   canvasWidth - (2 * (canvasWidth * 0.10)),
							   canvasHeight - (2 * (canvasHeight * 0.15)));


var blockCreator = new BlockCreator(workspace.getX() + 10,
									workspace.getY() + 10,
									40,
									40);


let musicBlocks = [];

var puzzle_image;

//===========================================================================

// MAIN FUNCTIONS  

function preload() 
{
	puzzle_image = loadImage("assets/puzzle.png");
}

function setup() 
{
  createCanvas(canvasWidth, canvasHeight);
}

function draw() 
{
  	noStroke();
  	background(lightGrey);

  	workspace.draw();
  	blockCreator.draw();
  	for (let i = 0; i < musicBlocks.length; ++i)
  	{
		musicBlocks[i].draw();
	}
}

function mousePressed() 
{
	// If block creator is pressed
	if (blockCreator.hasMouseOver()) 
	{
		musicBlocks.push(new MusicBlock(250 + random(0, 40),
										150 + random(-20,40),
										200,
										100));
	}

	// If a music block is pressed 
	for (let i = 0; i < musicBlocks.length; ++i)
	{
		musicBlocks[i].mousePressed();
	}
}

function mouseReleased()
{
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