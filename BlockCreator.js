class BlockCreator{

	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(){
		fill(darkGrey);
		rect(this.x, this.y, this.width, this.height);
	}

	hasMouseOver(){
		if (mouseX >= this.x 
		    && mouseX <= this.x+this.width
		    && mouseY >= this.y
		    && mouseY <= this.y+this.height){
			return true;
		}else{
			return false;
		}

	}
	
}