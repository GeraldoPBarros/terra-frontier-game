const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// draw a rectangle in the position 0, 0 of the screen
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// getting the image
const image = new Image();
image.src = "./img/Map.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprite {
	constructor({
		position, velocity, image
	}) {
		this.position = position;
		this.image = image
	}
	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}
}

const background = new Sprite({ 
	position: {
		x: -1205,
		y: -470
},
	image: image
})

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


function animate(){
	// function to be called recursivily
	window.requestAnimationFrame(animate);

	// draw into the screen when the image load
	background.draw();
	const playerXPos = canvas.width / 2 - playerImage.width / 4 / 2;
	const playerYPos = canvas.height / 2 - playerImage.height / 2;
	ctx.drawImage(playerImage, 
		0, // crop start position y
		0, // crop start position x
		playerImage.width / 4, // crop width divided by 4
		playerImage.height, // crop the full height
		playerXPos, 
		playerYPos,
		playerImage.width / 4,
		playerImage.height
	);
	if (keys.w.pressed && lastKey === "w") {
		background.position.y += 3;
	}
	else if (keys.s.pressed && lastKey === "s") {
		background.position.y -= 3;
	}
	else if (keys.a.pressed && lastKey === "a") {
		background.position.x += 3;
	}
	else if (keys.d.pressed && lastKey === "d") {
		background.position.x -= 3;
	}
}

animate();

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