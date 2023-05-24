import { Server as SocketServer, Socket } from "socket.io";
import { GamePlayer, Player } from "./Player";

export class GameServer {
	name: string;
	uuid: string;
	seed: number;
	players: Player[];

	constructor(uuid: string) {
		// TODO: get saved world information from database
		let worldData;

		// if none then create some data
		worldData = {
			name: "Cool Server",
			seed: 1,
			blocks: [],
		};

		// initialize
		this.name = worldData.name;
		this.uuid = uuid;
		this.seed = worldData.seed;
		this.players = [];
	}

	/*
		Called when a user connects to the server
	*/
	addPlayer(name: string, uuid: string, socket: Socket) {
		const index = this.players.findIndex((player) => player.uuid === uuid);
		if (index != -1) {
			console.log(`${name} is already in: ${this.name}`);
			return;
		}

		const player = new GamePlayer(name, uuid, socket);

		this.players.push(player);

		socket.join(this.uuid);

		console.warn(`Player ${player.name} successfully joined: ${this.name}`);
	}

	/*
		Called when a users socket disconnects or they manually disconnect
	*/
	removePlayer(uuid: string) {
		const index = this.players.findIndex((player) => player.uuid === uuid);
		if (index == -1) return;

		const player = this.players[index];
		this.players.splice(index, 1);
		player.cleanup();

		console.warn(`Player ${player.name} successfully left: ${this.name}`);
	}
}

export type Server = InstanceType<typeof GameServer>;
