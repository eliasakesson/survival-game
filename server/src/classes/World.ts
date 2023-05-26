import { Chunk, ChunkType } from "./Chunk";
import { Block, BlockType } from "./Block";

export class World {
	name: string;
	chunks: ChunkType[];

	constructor(name: string) {
		this.name = name;
		this.chunks = [];
	}

	tick() {
		//console.log("world ticked");
	}
}

export type WorldType = InstanceType<typeof World>;
