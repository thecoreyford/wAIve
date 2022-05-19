class BlockCreator{

	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(){
		fill(darkBlue);
		rect(this.x, this.y, this.width, this.height);
	}
	
}