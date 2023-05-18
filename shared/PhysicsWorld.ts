export default class PhysicsWorld {
	objects: any;

	constructor() {
		this.objects = [];
	}

	Update(deltaTime) {
		this.objects.forEach((obj) => {
			obj.Update(deltaTime);
		});
	}

	AddObject(obj) {
		this.objects.push(obj);
	}
}
