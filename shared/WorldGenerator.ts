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

	private GetBlocksAround(
		x: number,
		y: number
	): {
		left: Block | undefined;
		above: Block | undefined;
		leftUnder: Block | undefined;
	} {
		const aboveBlockChunk = this.world.find(
			(c) =>
				c.x - ChunkSize <= x &&
				c.x + ChunkSize >= x &&
				c.y - ChunkSize <= y + BlockSize &&
				c.y + ChunkSize >= y + BlockSize
		);

		let aboveBlock;
		if (aboveBlockChunk) {
			aboveBlock = aboveBlockChunk.blocks.find(
				(b) => b.x === x && b.y === y + BlockSize
			);
		}

		const leftBlockChunk = this.world.find(
			(c) =>
				c.x - ChunkSize <= x - BlockSize &&
				c.x + ChunkSize >= x - BlockSize &&
				c.y - ChunkSize <= y &&
				c.y + ChunkSize >= y
		);

		let leftBlock;
		if (leftBlockChunk) {
			leftBlock = leftBlockChunk.blocks.find(
				(b) => b.x === x - BlockSize && b.y === y
			);
		}

		const leftUnderBlockChunk = this.world.find(
			(c) =>
				c.x - ChunkSize <= x - BlockSize &&
				c.x + ChunkSize >= x - BlockSize &&
				c.y - ChunkSize <= y + BlockSize &&
				c.y + ChunkSize >= y + BlockSize
		);

		let leftUnderBlock;
		if (leftUnderBlockChunk) {
			leftUnderBlock = leftUnderBlockChunk.blocks.find(
				(b) => b.x === x - BlockSize && b.y === y + BlockSize
			);
		}

		return {
			left: leftBlock,
			above: aboveBlock,
			leftUnder: leftUnderBlock,
		};
	}

	private GetBlockType = (chunk: Chunk, x: number, y: number) => {
		const { left, above, leftUnder } = this.GetBlocksAround(
			chunk.x + x,
			chunk.y + y
		);
		console.log(left, above, leftUnder);

		if (chunk.y + y > window.innerHeight / 2) {
			return BlockType.Grass;
		}

		return BlockType.Air;
	};
}
