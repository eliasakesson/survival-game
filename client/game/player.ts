class Player implements Rigidbody {
	position: Vector2;
	dimension: Vector2;
	velocity: Vector2;
	color: string;

	constructor(pos?: Vector2, dim?: Vector2, vel?: Vector2, color?: string) {
		this.position = pos || {
			x: 0,
			y: 0,
		};
		this.dimension = dim || {
			x: 100,
			y: 200,
		};
		this.velocity = vel || {
			x: 0,
			y: 0,
		};
		this.color = color || "red";
	}

	Update(canvas: HTMLCanvasElement, deltaTime: number) {
		const ctx = canvas.getContext("2d");

		const UpdatePosition = () => {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;

			if (this.position.y + this.dimension.y > canvas.height) {
				this.velocity.y = 0;
				this.position.y = canvas.height - this.dimension.y;
			} else {
				this.velocity.y += (9.82 / 20) * deltaTime;
			}
		};

		const Draw = () => {
			ctx.fillStyle = this.color;
			ctx.fillRect(
				this.position.x,
				this.position.y,
				this.dimension.x,
				this.dimension.y
			);
		};

		UpdatePosition();
		Draw();
	}

	ApplyForce(force: Vector2) {
		this.velocity.x += force.x;
		this.velocity.y += force.y;
	}

	MoveTo(position: Vector2) {
		this.position = position;
	}
}
