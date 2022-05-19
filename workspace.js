class Workspace {
	
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.blockCreator = new BlockCreator(this.x + 10,
											 this.y + 10,
											 40,
											 40);
	}

	draw(){
		fill(lightGrey);
		rect(this.x, this.y, this.width, this.height);

		this.blockCreator.draw();
	}

}