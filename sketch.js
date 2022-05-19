
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
	if (blockCreator.hasMouseOver()) {
		musicBlocks.push(new MusicBlock(100,100,180,100));
	}

	for (let i = 0; i < musicBlocks.length; ++i){
		musicBlocks[i].mousePressed();
	}
}

function mouseReleased(){
	for (let i = 0; i < musicBlocks.length; ++i){
		musicBlocks[i].mouseReleased();
	}
}