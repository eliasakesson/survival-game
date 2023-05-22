import GameObject from "./GameObject.js";
import { Gravity, MaxVelocity } from "./Constants.js";
import { Vector2, BlockSize } from "./Constants.js";

export default class PhysicsObject extends GameObject {
	protected velocity: Vector2;
	protected grounded: boolean = false;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.velocity = { x: 0, y: 0 };
	}

	public Update(deltaTime: number) {
		// Gravity
		this.velocity.y = Math.min(
			this.velocity.y + Gravity * deltaTime,
			MaxVelocity
		);

		// Position update
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		super.Update(deltaTime);
	}

	public HandleCollisions(blocks: Vector2[]) {
		blocks.forEach((block) => {
			if (
				this.position.x + this.size.x > block.x &&
				this.position.x < block.x + BlockSize &&
				this.position.y + this.size.y > block.y &&
				this.position.y < block.y + BlockSize
			) {
				// Calculate the overlap in each direction
				const overlapX = Math.min(
					this.position.x + this.size.x - block.x,
					block.x + BlockSize - this.position.x
				);
				const overlapY = Math.min(
					this.position.y + this.size.y - block.y,
					block.y + BlockSize - this.position.y
				);

				// Determine the direction of the smallest overlap
				if (overlapX < overlapY) {
					// Push out horizontally
					if (
						this.position.x + this.size.x / 2 <
						block.x + BlockSize / 2
					) {
						this.position.x -= overlapX;
					} else {
						this.position.x += overlapX;
					}
					this.velocity.x = 0;
				} else {
					// Push out vertically
					if (
						this.position.y + this.size.y / 2 <
						block.y + BlockSize / 2
					) {
						this.position.y -= overlapY;
						this.grounded = true;
					} else {
						this.position.y += overlapY;
					}
					this.velocity.y = 0;
				}
			}
		});
	}

	public AddForce(force: any) {
		this.velocity.x += force.x;
		this.velocity.y += force.y;
	}
}
