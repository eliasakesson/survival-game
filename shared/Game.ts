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
		this.world = new WorldGenerator();
		this.player = new Player(ctx);

		requestAnimationFrame(this.Update.bind(this));
	}

	public Update(time: number) {
		const deltaTime = time - this.lastTime;
		this.lastTime = time;

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		this.world.Update(this.ctx);
		this.player.Update(deltaTime);

		requestAnimationFrame(this.Update.bind(this));
	}
}
