import { BlockSize, ChunkSize } from "./Constants";

interface Chunk {
	x: number;
	y: number;
	blocks: Block[];
	walkableBlocks: Block[];
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
	private world: Chunk[];

	constructor() {
		this.world = [];
		this.GenerateWorld();
	}

	public Update(ctx: CanvasRenderingContext2D) {
		this.RenderWorld(ctx);
	}

	private GenerateWorld() {
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
					walkableBlocks: [],
				};

				for (let x = 0; x < ChunkSize; x += BlockSize) {
					for (let y = 0; y < ChunkSize; y += BlockSize) {
						const blockType = this.GetBlockType(chunk, x, y);

						const block: Block = {
							x: x,
							y: y,
							type: blockType,
						};

						chunk.blocks.push(block);

						if (blockType === BlockType.Grass) {
							chunk.walkableBlocks.push(block);
						}
					}
				}

				this.world.push(chunk);
			}
		}
	}

	private RenderWorld(ctx: any) {
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

	public GetCloseWalkableBlocks(x: number, y: number): Block[] {
		const chunks = this.world.filter(
			(c) =>
				c.x - ChunkSize <= x &&
				c.x + ChunkSize >= x &&
				c.y - ChunkSize <= y &&
				c.y + ChunkSize >= y
		);

		return chunks.map((chunk) => chunk.walkableBlocks).flat();
	}

	private ColorFromBlockType(type: BlockType): string {
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

	private GetBlockType = (chunk: Chunk, x: number, y: number) => {
		let blockAbove;
		if (y > 0) {
			blockAbove = chunk.blocks.find(
				(b) => b.x === x && b.y === y - BlockSize
			);
		} else {
			const aboveChunk = this.world.find(
				(c) => c.x === chunk.x && c.y === chunk.y - ChunkSize
			);
			if (aboveChunk) {
				blockAbove = aboveChunk.blocks.find(
					(b) => b.x === x && b.y === ChunkSize - BlockSize
				);
			}
		}

		const rand = Math.random();

		if (blockAbove) {
			if (blockAbove.type === BlockType.Grass) {
				return BlockType.Dirt;
			}
			if (blockAbove.type === BlockType.Air) {
				const airChance =
					((window.innerHeight / 2 - y) / window.innerHeight) * 5;

				if (rand < airChance) {
					return BlockType.Air;
				}

				return BlockType.Grass;
			}
			if (blockAbove.type === BlockType.Dirt) {
				const dirtChance =
					(((window.innerHeight * 2) / 3 - y) / window.innerHeight) *
					3;

				if (rand < dirtChance) {
					return BlockType.Dirt;
				}

				return BlockType.Stone;
			}
			if (blockAbove.type === BlockType.Stone) {
				return BlockType.Stone;
			}
		}

		return BlockType.Air;
	};
}
