function gravity(a, b) {
	let F = [b.pos[0] - a.pos[0], b.pos[1] - a.pos[1]];
	let m = a.mass * b.mass / Math.pow(Math.sqrt(Math.pow(a.pos[0]-b.pos[0],2)+Math.pow(a.pos[1]-b.pos[1],2)),3);
	return [F[0]*m, F[1]*m];
}

function collision(a, b, d){
	return dist(a[0],a[1],b[0],b[1]) < d-10;
}

class Body {

	constructor(
			pos = [0,0],
			vel = [0,0],
			acc = [0,0],
			rad = 10,
			mass = 50,
			alive = true,
			fixed = false
		) {
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
		this.rad = rad;
		this.mass = mass;
		this.alive = alive;
		this.fixed = fixed;
	}

	setAcc(acc) {
		this.acc[0] = acc[0];
		this.acc[1] = acc[1];
	}

	accelerate() {
		this.vel[0] += this.acc[0];
		this.vel[1] += this.acc[1];
	}

	move() {
		if(this.fixed) return;
		if(this.pos[0] < 0 || this.pos[0] > width) this.vel[0] = -this.vel[0];
		if(this.pos[1] < 0 || this.pos[1] > height) this.vel[1] = -this.vel[1];
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

	render() {
		fill([abs(255 - this.vel[0]*25),abs(255 - this.vel[1]*25),255 - this.mass/500]);
		circle(this.pos[0],this.pos[1],this.rad);
	}

	run() {
		this.accelerate();
		this.move();
		this.render();
	}
}

class Universe {

	constructor() {
		this.bodies = [];
	}

	calculate() {
		let i, j, F, Fg, alives = [], max = this.bodies.length;
		for(i = 0; i < max; i++) {
			F = [0,0];
			for(j = 0; j < max; j++) {
				if(i !== j && this.bodies[i].alive) {
					if(collision(this.bodies[i].pos,this.bodies[j].pos,this.bodies[i].rad + this.bodies[j].rad)) {
						let fusion = new Body(
							[
								(this.bodies[i].pos[0]+this.bodies[j].pos[0])/2,
								(this.bodies[i].pos[1]+this.bodies[j].pos[1])/2,
							],
							[0,0],
							[0,0],
							this.bodies[i].rad*0.8 + this.bodies[j].rad*0.8,
							this.bodies[i].mass + this.bodies[j].mass
						);
						this.bodies[i].alive = false;
						this.bodies[j].alive = false;
						this.bodies.push(fusion);
					}
					Fg = gravity(this.bodies[i],this.bodies[j]);
					F[0] += Fg[0];
					F[1] += Fg[1];
				}
			}
			this.bodies[i].setAcc([F[0]/this.bodies[i].mass, F[1]/this.bodies[i].mass]);
		}
		for(i = 0; i < this.bodies.length; i++) {
			if(this.bodies[i].alive) alives.push(this.bodies[i]);
		}
		this.bodies = alives;
	}

	fix() {
		let massive = 0;
		for(let i = 0; i < this.bodies.length; i++) {
			if(this.bodies[i].mass > this.bodies[massive].mass) {
				massive = i;
			}
		}
		this.bodies[massive].fixed = true;
	}

	run() {
		this.calculate();
		for(const body of this.bodies) {
			body.run();
		}
	}
}