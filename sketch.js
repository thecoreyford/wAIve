
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

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(lightGrey);
}

function draw() {
  workspace.draw();
  blockCreator.draw();
}

function mousePressed(){
	if (blockCreator.hasMouseOver()) {
		console.log("block creator pressed");
	}
}