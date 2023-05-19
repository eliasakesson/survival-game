import { BlockSize, ChunkSize } from "./Constants";

interface Chunk {
	x: number;
	y: number;
	blocks: Block[];
}

interface Block {
	x: number;
	y: number;
	type: BlockType;
}

enum BlockType {
	Air,
	Dirt,
	Stone,
	Grass,
}

export default class WorldGenerator {
	world: Chunk[];

	constructor() {
		this.world = [];
	}

	Start(ctx: any) {
		console.log("WorldGenerator started");
		this.GenerateWorld();
		this.RenderWorld(ctx);
	}

	GenerateWorld() {
		this.world = [];

		for (let chunkX = 0; chunkX < window.innerWidth; chunkX += ChunkSize) {
			for (
				let chunkY = 0;
				chunkY < window.innerHeight;
				chunkY += ChunkSize
			) {
				const chunk: Chunk = {
					x: chunkX,
					y: chunkY,
					blocks: [],
				};

				for (let x = 0; x < ChunkSize; x += BlockSize) {
					for (let y = 0; y < ChunkSize; y += BlockSize) {
						const type = Math.floor(Math.random() * 4);

						const block: Block = {
							x: x,
							y: y,
							type: type,
						};

						chunk.blocks.push(block);
					}
				}

				this.world.push(chunk);
			}
		}

		console.log(this.world);
	}

	RenderWorld(ctx: any) {
		for (const chunk of this.world) {
			for (const block of chunk.blocks) {
				ctx.fillStyle = this.ColorFromBlockType(block.type);
				ctx.fillRect(
					chunk.x + block.x,
					chunk.y + block.y,
					BlockSize,
					BlockSize
				);
			}
		}
	}

	ColorFromBlockType(type: BlockType): string {
		switch (type) {
			case BlockType.Air:
				return "#ADD8E6";
			case BlockType.Dirt:
				return "#8B4513";
			case BlockType.Stone:
				return "#808080";
			case BlockType.Grass:
				return "#228B22";
		}
	}
}
