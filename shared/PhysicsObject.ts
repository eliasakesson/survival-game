type Vector2 = {
	x: number
	y: number
}

export class PhysicsObject {
	velocity: Vector2

	constructor() {}

	update(deltaTime: number) {}
}
