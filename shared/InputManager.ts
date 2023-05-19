export default class InputManager {
	private keys: { [key: string]: boolean } = {};

	constructor() {
		window.addEventListener("keydown", (e) =>
			this.HandleInput(e.key, true)
		);
		window.addEventListener("keyup", (e) => this.HandleInput(e.key, false));
	}

	public IsKeyDown(key: string): boolean {
		if (this.keys[key] && !this.keys[`prev_${key}`]) {
			this.keys[`prev_${key}`] = true;
			return true;
		}

		return false;
	}

	public IsKey(key: string): boolean {
		return this.keys[key];
	}

	private HandleInput(key: any, keyDown: boolean) {
		switch (key) {
			case "ArrowLeft":
			case "a":
				this.keys["Left"] = keyDown;
				if (!keyDown) {
					this.keys["prev_Left"] = false;
				}
				break;
			case "ArrowRight":
			case "d":
				this.keys["Right"] = keyDown;
				if (!keyDown) {
					this.keys["prev_Right"] = false;
				}
				break;
			case " ":
				this.keys["Jump"] = keyDown;
				if (!keyDown) {
					this.keys["prev_Jump"] = false;
				}
				break;
			case "Escape":
				this.keys["Escape"] = keyDown;
				if (!keyDown) {
					this.keys["prev_Escape"] = false;
				}
				break;
			default:
				break;
		}
	}
}
