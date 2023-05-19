import { BlockSize } from "./Constants";

export default class GameObject {
	ctx: CanvasRenderingContext2D;
	position: any;
	size: any;
	sprite: any;

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
