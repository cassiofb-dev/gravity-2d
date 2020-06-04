let width = screen.width, height = screen.height;
let universe, x, y;

function setup() {
	createCanvas(width, height);
	universe = new Universe();
	universe.bodies.push(new Body([width/2,height/2],[0,0],[0,0],50,10000,true,true));
	universe.bodies.push(new Body([width/2,height/3],[10,0],[0,0],20,100));
	universe.bodies.push(new Body([width/2,height/10],[3.2,0],[0,0],10,50));
}

function draw() {
	background(0);
	universe.run();
}

function mousePressed() {
	x = mouseX;
	y = mouseY;
	fullscreen(true);
}

function mouseReleased() {
	universe.bodies.push(new Body([x,y], [(mouseX - x)/10, (mouseY - y)/10]));
}

function keyTyped() {
	switch(key) {
		case 'f':
			universe.fix();
			break;
		case 'r':
			universe = new Universe();
			break;
	}
}