import { BlockSize } from "./Constants";
import { Vector2 } from "./Constants";

export default class GameObject {
	private ctx: CanvasRenderingContext2D;
	public position: Vector2;
	protected size: Vector2;
	private sprite: any;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;

		this.position = { x: 0, y: 0 };
		this.size = { x: BlockSize, y: BlockSize };
	}

	Update(deltaTime: number) {
		// Update logic here
		this.Draw(this.ctx);
	}

	Draw(ctx: CanvasRenderingContext2D) {
		if (this.sprite) {
			ctx.drawImage(
				this.sprite,
				this.position.x,
				this.position.y,
				this.size.x,
				this.size.y
			);
		} else {
			ctx.fillStyle = "#000000";
			ctx.fillRect(
				this.position.x,
				this.position.y,
				this.size.x,
				this.size.y
			);
		}
	}
}
