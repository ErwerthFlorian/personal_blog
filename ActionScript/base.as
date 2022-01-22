package  {
	
	import flash.display.MovieClip;
	
	
	public class base extends MovieClip {

		var count:Number = 10;
		public function base() {
			if(this.currentFrame == 2) {
				trace(2);
			}
		}
	}
	
}
