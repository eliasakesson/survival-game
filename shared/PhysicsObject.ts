import GameObject from "./GameObject.js";
import { Gravity, MaxVelocity } from "./Constants.js";

export default class PhysicsObject extends GameObject {
	velocity: any;

	constructor(ctx) {
		super(ctx);

		this.velocity = { x: 0, y: 0 };
	}

	Update(deltaTime) {
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
}
