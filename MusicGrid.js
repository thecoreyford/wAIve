class MusicGrid {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y; 
		this.width = width;
		this.height = height;

		this.gridWidth = 8;
		this.gridHeight = 8;

		this.padding = 2;

		this.toggleButtons = [];

		for (let j = 0; j < this.gridWidth; ++j) {
  			for (let i = 0; i < this.gridHeight; ++i) {
  				this.toggleButtons.push(new ToggleButton (this.x + (this.width / this.gridWidth) * j + (this.padding * 0.5),
  			 										this.y + (this.height / this.gridHeight) * i + (this.padding * 0.5), 
  			 										(this.width / this.gridWidth) - this.padding,
  			 										(this.height / this.gridHeight) - this.padding));
  			}
  		}	
	}

	update(x, y, w, h){
		this.x = x + (w * 0.075);
		this.y = y + (h * 0.05); 
		this.width = w * 0.85;
		this.height = h * 0.9;

		let counter = 0; 
		for (let j = 0; j < this.gridWidth; ++j) {
  			for (let i = 0; i < this.gridHeight; ++i) {
  				this.toggleButtons[counter].update(this.x + (this.width / this.gridWidth) * j + (this.padding * 0.5),
  			 							  		   this.y + (this.height / this.gridHeight) * i + (this.padding * 0.5), 
  			 							  	       (this.width / this.gridWidth) - this.padding,
  			 							           (this.height / this.gridHeight) - this.padding);

  				counter++;
  			}
  		}	
	}

	draw(){
		noStroke();
		fill("#FF88FF")
		rect(this.x, this.y, this.width, this.height);
  
  		for (let i = 0; i < this.toggleButtons.length; ++i){
  			this.toggleButtons[i].draw();	
  		}
	}

	mousePressed() {
		for (let i = 0; i < this.toggleButtons.length; ++i){
	  		if(this.toggleButtons[i].hasMouseOver()){
	  			this.toggleButtons[i].toogle();
	  		}	
	  	}
	}
}