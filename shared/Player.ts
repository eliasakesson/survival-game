import { BlockSize } from "./Constants";
import PhysicsObject from "./PhysicsObject";
import InputManager from "./InputManager";

export default class Player extends PhysicsObject {
	private inputManager: InputManager;

	playerSpeed: number = 0.5;
	jumpForce: number = 0.5;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.size = { x: BlockSize, y: BlockSize * 2 };
		this.inputManager = new InputManager();
	}

	public Update(deltaTime: number) {
		this.HandleInput();

		super.Update(deltaTime);
	}

	private HandleInput() {
		if (this.inputManager.IsKey("Left")) {
			this.velocity.x = -this.playerSpeed;
		} else if (this.inputManager.IsKey("Right")) {
			this.velocity.x = this.playerSpeed;
		} else {
			this.velocity.x = 0;
		}

		if (this.grounded && this.inputManager.IsKeyDown("Jump")) {
			this.grounded = false;
			this.AddForce({ x: 0, y: -this.jumpForce });
		}
	}
}
