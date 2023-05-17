interface Player extends GameObject {
	velocity: Vector2;
	color: string;
}

interface GameObject {
	position: Vector2;
	dimension: Vector2;
}

interface Vector2 {
	x: number;
	y: number;
}
