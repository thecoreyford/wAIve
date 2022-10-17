class TimelineBar
{

	//TODO: Comment nicely 
	//TODO: remove the hard coding 

	constructor ()
	{
		this.ellipseX = 245;
	}

	draw()
	{
		fill("#000000");
		rect(240,195,970,12,5);

		fill(darkGrey);
		ellipse(this.ellipseX, 200,20,20);

		if (mouseIsPressed === true 
			&& mouseX > 240 
			&& mouseX < 240 + 970 
			&& mouseY > 195 
			&& mouseY < 195 + 12) 
		{
			rect(this.ellipseX - 3,195,5,970,5);
		}
	}

	mousePressed()
	{
		if (mouseX > 240 
			&& mouseX < 240 + 970 
			&& mouseY > 195 
			&& mouseY < 195 + 12) {
			this.ellipseX = mouseX;
		}
	}

	getX()
	{
		return this.ellipseX; 
	}
}