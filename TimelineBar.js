class TimelineBar
{

	//TODO: Comment nicely 
	//TODO: remove the hard coding 

	constructor ()
	{
		this.ellipseX = 150;
	}

	draw()
	{
		fill(darkGrey);
		rect(150,150,900,30,5);

		// ellipse (this.ellipseX, 155,20,20);
		playButton.setXandY(this.ellipseX - 20,145);

		if (mouseIsPressed === true 
			&& mouseX > 150 
			&& mouseX < 150 + 900
			&& mouseY > 150 
			&& mouseY < 150 + 30) 
		{
			rect (this.ellipseX - 3, 150, 5, 900, 5);
		}

		// rect(this.ellipseX,150,900 - (this.ellipseX - 300),12,5);
	}

	mousePressed()
	{
		if (mouseX > 150 
			&& mouseX < 150 + 900 
			&& mouseY > 150 
			&& mouseY < 150 + 30) {
			this.ellipseX = mouseX;
		}
	}

	getX()
	{
		return this.ellipseX; 
	}
}