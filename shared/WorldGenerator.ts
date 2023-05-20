import { BlockSize, ChunkSize } from "./Constants";
import { Vector2 } from "./Constants";
import PerlinNoise from "./PerlinNoise";

interface Chunk {
	x: number;
	y: number;
	blocks: Block[];
	collisionBlock: Block[];
}

export interface Block {
	x: number;
	y: number;
	worldX: number;
	worldY: number;
	type: BlockType;
}

enum BlockType {
	Air,
	Grass,
	Dirt,
	Stone,
}

export default class WorldGenerator {
	private ctx: CanvasRenderingContext2D;
	private world: Chunk[];
	private seed: number = Math.random() * 1e6;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.world = [];
		this.GenerateWorld();
	}

	public Update() {
		if (this.ctx) {
			this.RenderWorld(this.ctx);
		}
	}

	public GenerateWorld() {
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
					collisionBlock: [],
				};

				for (let x = 0; x < ChunkSize; x += BlockSize) {
					for (let y = 0; y < ChunkSize; y += BlockSize) {
						const blockType = this.GetBlockType(
							chunk.x + x,
							chunk.y + y
						);

						const block: Block = {
							x: x,
							y: y,
							worldX: chunk.x + x,
							worldY: chunk.y + y,
							type: blockType,
						};

						chunk.blocks.push(block);

						if (blockType !== BlockType.Air) {
							chunk.collisionBlock.push(block);
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
				ctx.fillRect(block.worldX, block.worldY, BlockSize, BlockSize);
			}
		}
	}

	public GetCloseCollisionBlocks(position: Vector2): Vector2[] {
		const chunks = this.world.filter(
			(c) =>
				c.x - ChunkSize <= position.x &&
				c.x + ChunkSize >= position.x &&
				c.y - ChunkSize <= position.y &&
				c.y + ChunkSize >= position.y
		);

		return chunks
			.map((chunk) =>
				chunk.collisionBlock.map((block) => {
					return {
						x: block.worldX,
						y: block.worldY,
					};
				})
			)
			.flat();
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

	private GetBlockType = (x: number, y: number): BlockType => {
		let noise = PerlinNoise(x / 500 + this.seed, y / 500 + this.seed);
		noise -= 1 - y / window.innerHeight;
		noise = Math.max(noise, -1);

		if (noise < -0.5) {
			return BlockType.Air;
		} else if (noise < -0.3) {
			return BlockType.Grass;
		} else if (noise < 0) {
			return BlockType.Dirt;
		} else {
			return BlockType.Stone;
		}
	};

	MapValue(
		value: number,
		fromMin: number,
		fromMax: number,
		toMin: number,
		toMax: number
	) {
		return (
			((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
		);
	}
}
