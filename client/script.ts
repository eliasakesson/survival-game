const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const player = new Player();

function Start() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	player.MoveTo({
		x: canvas.width / 2 - player.dimension.x / 2,
		y: 0,
	});

	requestAnimationFrame(Update);
}

let lastTime = 0;

function Update(time: number) {
	const deltaTime = ((time - lastTime) * 60) / 1000;
	lastTime = time;

	CanvasHandler.Clear();
	player.Update(canvas, deltaTime);

	if (InputHandler.IsKeyDown("Jump")) {
		player.ApplyForce({
			x: 0,
			y: -10,
		});

		InputHandler.Input.Jump = false;
	}

	requestAnimationFrame(Update);
}

Start();

const CanvasHandler = {
	Clear: () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
};

const InputHandler = {
	IsKeyDown: (key: string) => {
		return InputHandler.Input[key];
	},
	Input: {
		Left: false,
		Right: false,
		Jump: false,
	},
	HandleKeyEvent: (key: string, state: boolean) => {
		switch (key) {
			case "ArrowLeft":
				InputHandler.Input.Left = state;
				break;
			case "ArrowRight":
				InputHandler.Input.Right = state;
				break;
			case " ":
				InputHandler.Input.Jump = state;
				break;
			default:
				break;
		}
	},
};

window.addEventListener("keydown", (e) => {
	InputHandler.HandleKeyEvent(e.key, true);
});

window.addEventListener("keyup", (e) => {
	InputHandler.HandleKeyEvent(e.key, false);
});
