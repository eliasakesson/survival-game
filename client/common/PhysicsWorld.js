export default class PhysicsWorld {
	constructor() {
		this.objects = []
	}

	Update(deltaTime) {
		this.objects.forEach((obj) => {
			obj.Update(deltaTime)
		})
	}

	AddObject(obj) {
		this.objects.push(obj)
	}
}
