interface Rigidbody extends GameObject {
	velocity: Vector2;
}

interface GameObject {
	position: Vector2;
	dimension: Vector2;
	Update: (canvas: HTMLCanvasElement, deltaTime: number) => void;
}

interface Vector2 {
	x: number;
	y: number;
}
