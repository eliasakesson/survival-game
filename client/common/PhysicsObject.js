import GameObject from "./GameObject.js";
import { Gravity } from "./Constants.js";

export default class PhysicsObject extends GameObject {
	constructor() {
		super(...arguments)

		this.velocity = { x: 0, y: 0 }
	}

	Update(deltaTime) {
		// Gravity
		this.velocity.y += Gravity * deltaTime

		// Position update
		this.position.x += this.velocity.x * deltaTime
		this.position.y += this.velocity.y * deltaTime

		super.Update()
	}
}
