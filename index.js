const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

console.log(collisions);

canvas.width = 1024;
canvas.height = 576;


const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70){
	collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary {
	static width = 48;
	static height = 48;
	constructor({ position }) {
		this.position = position;
		this.width = 48; // 12 x 4 - size of the square
		this.height = 48; // 12 x 4
	}

	draw() {
		ctx.fillStyle = "rgba(255, 0, 0, 0.2)"; // red
		ctx.fillRect(this.position.x, 
					 this.position.y,
					 this.width,
					 this.height);
	}
}


const boundaries = [];
const offset = {
	x: -1205,
	y: -520
}

 // get the collisions
 collisionsMap.forEach((row, i) => {
 	row.forEach((symbol, j) => {
 		if (symbol === 1025) {
 			boundaries.push(new Boundary({
	 			position: {
	 				x: j * Boundary.width + offset.x,
	 				y: i * Boundary.height + offset.y
	 			}
 			}))	
 		}
 		
 	})
 });

 console.log(boundaries);

// getting the image
const image = new Image();
image.src = "./img/Map.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprite {
	constructor({
		position, velocity, image, frames = { max: 1 }
	}) {
		this.position = position;
		this.image = image,
		this.frames = frames,
		this.image.onload = () => {
			this.width = this.image.width / this.frames.max;
			this.height = this.image.height;
		}
	}
	draw() {
		ctx.drawImage(this.image, 
			0, // crop start position y
			0, // crop start position x
			this.image.width / this.frames.max, // crop width divided by 4
			this.image.height, // crop the full height
			this.position.x,
			this.position.y,
			this.image.width / this.frames.max,
			this.image.height
		);
	}
}
const playerXPos = canvas.width / 2 - 192 / 4 / 2;
const playerYPos = canvas.height / 2 - 68 / 2;

const player = new Sprite({
	position: {
		x: playerXPos,
		y: playerYPos
	},
	image: playerImage,
	frames: {
		max: 4
	}
})


const background = new Sprite({ 
	position: {
		x: offset.x,
		y: offset.y
},
	image: image
})


// get the pressed key to set player moviment
const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
}

const movables = [background, ...boundaries];

function rectangularCollision({ rectangle1, rectangle2}){
	return(
		rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
		rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
		rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
		rectangle1.position.y + rectangle1.height >= rectangle2.position.y
	);		
}

function animate(){
	// function to be called recursivily
	window.requestAnimationFrame(animate);

	// draw into the screen when the image load
	background.draw();
	player.draw();

	boundaries.forEach(boundary => {
		boundary.draw();
	})
	
	let moving = true;
	// move player regarding key press
	if (keys.w.pressed && lastKey === "w") {
		for (let i = 0; i < boundaries.length; i++){
			const boundary = boundaries[i];
				
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x,
							y: boundary.position.y + 3
						}
					}
				})
			){
				console.log("Colliding!");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach(movable => {
				movable.position.y += 3;
			})	
		}
	}
	else if (keys.s.pressed && lastKey === "s") {
		for (let i = 0; i < boundaries.length; i++){
			const boundary = boundaries[i];
				
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x,
							y: boundary.position.y - 3
						}
					}
				})
			){
				console.log("Colliding!");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach(movable => {
				movable.position.y -= 3;
			})
		}
	}
	else if (keys.a.pressed && lastKey === "a") {
		for (let i = 0; i < boundaries.length; i++){
			const boundary = boundaries[i];
				
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x + 3,
							y: boundary.position.y
						}
					}
				})
			){
				console.log("Colliding!");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach(movable => {
				movable.position.x += 3;
			})
		}
	}
	else if (keys.d.pressed && lastKey === "d") {
		for (let i = 0; i < boundaries.length; i++){
			const boundary = boundaries[i];
				
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x - 3,
							y: boundary.position.y
						}
					}
				})
			){
				console.log("Colliding!");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach(movable => {
				movable.position.x -= 3;
			})
		}
	}
}

animate();

// listener to capture key pressed
let lastKey = "";
window.addEventListener("keydown", (e) => {
	switch(e.key){
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			break;
		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			break;
		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			break;
		default: break;
	}
});

// stop character moviment
window.addEventListener("keyup", (e) => {
	switch(e.key){
		case "w":
			keys.w.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "d":
			keys.d.pressed = false;
			break;
		default: break;
	}
});

// console.log(ctx); 