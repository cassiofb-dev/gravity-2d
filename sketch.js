let width = screen.width, height = screen.height;
let universe, x, y, r = 10, m = 50;

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
	universe.bodies.push(new Body(
		[x,y],
		[(mouseX - x)/10, (mouseY - y)/10],
		[0,0],
		r,
		m
	));
}

function keyTyped() {
	switch(key) {
		case 'f':
			universe.fix();
			break;
		case 'r':
			universe = new Universe();
			break;
		case '1':
			r = 10;
			m = 50;
			break;
		case '2':
			r = 20;
			m = 100;
			break;
		case '3':
			r = 30;
			m = 200;
			break;
		case '4':
			r = 40;
			m = 1000;
			break;
		case '5':
			r = 50;
			m = 100000;
			break;
	}
}