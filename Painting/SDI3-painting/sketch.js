
let video;
let poseNet;
let poses = [];
let MIRROR_VIDEO_FEED = true;
let poseX;
let poseY;
let prevPoseX;
let prevPoseY;
let r;
let g;
let b;
var t = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
 video.hide();
  video.size(width, height);
  background(255);
  cor = color(random(255),random(255),random(255));
  frameRate(120);

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });
  loadVoiceCommands();
  startVoiceCommandsDetection();

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
	let fps = 120;

	if(MIRROR_VIDEO_FEED == true){
		translate(width,0);
		scale(-1.0,1.0);
	  }
	  //image(video, 0, 0, width, height);
	
	  if (poses.length > 0) {
		let pose = poses[0].pose;
	
		let rightEye = pose['rightEye'];
		let leftEye = pose['leftEye'];
		poseX = leftEye.x - 50;
		poseY = rightEye.y;
		let distanceX = abs(poseX - prevPoseX);
        let distanceY = abs(poseY - prevPoseY);
        let avDistance = (distanceX + distanceY)/2;
        avDistance = map (avDistance,0,200,1,20);
	    r = 255 * noise(t+10);
        g = 255 * noise(t+15);
        b = 255 * noise(t+20);

     
   if (isPainting)
	{
		paint();
	}    
  
  }
}

function paintWithLine()
{

  
  stroke(r, g, b);
 // strokeWeight(avDistance);
  line(poseX, poseY, prevPoseX, prevPoseY);

  prevPoseX = poseX;
  prevPoseY = poseY;

  t = t + 0.01;

}

function paintWithDotted()
{
	fill(r, g, b);
	ellipse(poseX, poseY, 20, 20);

	t = t + 0.01;
}





