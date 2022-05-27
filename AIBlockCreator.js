class AIBlockCreator
{
	constructor()
	{

	}	

	update(musicBlocks)
	{
		// TODO: if 25 seconds do the stuff in here
		if (keyIsDown(LEFT_ARROW)) 
		{
   			 musicBlocks.push (new AIBlock(250 + random(0, 40),
									  150 + random(-20,40),
									  200,
									  100));
  		}

	}
}