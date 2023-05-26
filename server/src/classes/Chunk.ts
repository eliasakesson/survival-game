import { Block, BlockType } from "./Block";

export class Chunk {
	blocks: BlockType[];

	constructor() {
		this.blocks = [];
	}
}

export type ChunkType = InstanceType<typeof Chunk>;
