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


let musicBlocks =  [];

var puzzle_image;

//===========================================================================

// MAIN FUNCTIONS  

function preload() {
	puzzle_image = loadImage("assets/puzzle.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  	noStroke();
  	background(lightGrey);

  	workspace.draw();
  	blockCreator.draw();
  	for (let i = 0; i < musicBlocks.length; ++i){
		musicBlocks[i].draw();
	}
}

function mousePressed() {
	// If block creator is pressed
	if (blockCreator.hasMouseOver()) {
		musicBlocks.push(new MusicBlock(100,100,200,100));
	}

	// If a music block is pressed 
	for (let i = 0; i < musicBlocks.length; ++i){
		musicBlocks[i].mousePressed();
	}
}

function mouseReleased(){
	// If a music block is released
	for (let i = 0; i < musicBlocks.length; ++i){
		musicBlocks[i].mouseReleased();
	}
}