
const canvasWidth = 1250;
const canvasHeight = 780; //580;

var workspace  = new Workspace(canvasWidth * 0.10, 
							   canvasHeight * 0.15, 
							   canvasWidth - (2 * (canvasWidth * 0.10)),
							   canvasHeight - (2 * (canvasHeight * 0.15)));

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(darkGrey);
}

function draw() {
  workspace.draw();
}