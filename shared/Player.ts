import { BlockSize } from "./Constants";
import PhysicsObject from "./PhysicsObject";

export default class Player extends PhysicsObject {
	constructor(ctx) {
		super(ctx);

		this.size = { x: BlockSize, y: BlockSize * 2 };
	}

	Update(deltaTime) {
		super.Update(deltaTime);
	}
}
