class ToggleButton{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y; 
		this.width = width; 
		this.height = height; 

		this.isOn = true;
	}

	update(x, y, w, h){
		this.x = x;
		this.y = y; 
		this.width = w; 
		this.height = h; 
	}

	draw(){
		if(this.isOn){
			fill("#FFFFFF")
		}else{
			fill("#FF0000")
		}
		
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
	
	toogle(){
		this.isOn = !this.isOn;
	}
}