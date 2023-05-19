import GameObject from "./GameObject.js";
import { Gravity, MaxVelocity } from "./Constants.js";

export default class PhysicsObject extends GameObject {
	velocity: any;

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

		// Temporary collision detection
		if (this.position.y > window.innerHeight / 2) {
			this.position.y = window.innerHeight / 2;
			this.velocity.y = 0;
		}

		// Position update
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		super.Update(deltaTime);
	}

	public AddForce(force: any) {
		this.velocity.x += force.x;
		this.velocity.y += force.y;
	}
}
