import WorldGenerator from "./WorldGenerator";
import Player from "./Player";

export default class Game {
	private ctx: CanvasRenderingContext2D;
	private world: WorldGenerator;
	private player: Player;

	private lastTime: number = 0;

	constructor(ctx: CanvasRenderingContext2D) {
		console.log("Game started");

		this.ctx = ctx;
		this.world = new WorldGenerator(ctx);
		this.player = new Player(ctx);

		requestAnimationFrame(this.Update.bind(this));

		setInterval(() => {
			this.world.GenerateWorld();
		}, 1000);
	}

	public Update(time: number) {
		const deltaTime = time - this.lastTime;
		this.lastTime = time;

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		this.world.Update();
		this.player.Update(deltaTime);
		this.player.HandleCollisions(
			this.world.GetCloseCollisionBlocks(this.player.position)
		);

		requestAnimationFrame(this.Update.bind(this));
	}
}
