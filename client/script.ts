const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const player = {
	position: {
		x: canvas.width / 2 - 50,
		y: canvas.height / 2 - 100,
	},
	dimension: {
		x: 100,
		y: 200,
	},
	velocity: {
		x: 0,
		y: 0,
	},
	color: "red",
};

function Update() {
	Draw.Clear();
	Draw.DrawPlayer(player);

	requestAnimationFrame(Update);
}

requestAnimationFrame(Update);

const Draw = {
	Clear: () => {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	DrawPlayer: (player: Player) => {
		if (!ctx) return;

		ctx.fillStyle = player.color;
		ctx.fillRect(
			player.position.x,
			player.position.y,
			player.dimension.x,
			player.dimension.y
		);
	},
};
