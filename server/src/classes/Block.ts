import { Vector2 } from "../../../shared/types";

export class Block {
	id: number;
	position: Vector2;
	metadata: {};

	constructor() {}
}

export type BlockType = InstanceType<typeof Block>;
