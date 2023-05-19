export default class PhysicsWorld {
	private objects: any;

	constructor() {
		this.objects = [];
	}

	public Update(deltaTime) {
		this.objects.forEach((obj) => {
			obj.Update(deltaTime);
		});
	}

	public AddObject(obj) {
		this.objects.push(obj);
	}
}
