import { PhysicsObject } from "./PhysicsObject"

export class PhysicsWorld {
	objects: []

	constructor() {
		this.objects = []
	}

	update(deltaTime: number) {}
}
