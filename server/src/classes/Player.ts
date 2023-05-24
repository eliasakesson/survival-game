import { Server as SocketServer, Socket } from "socket.io";

export class GamePlayer {
	name: string;
	uuid: string;
	inventory: [];
	socket: Socket;

	constructor(name: string, uuid: string, socket: Socket) {
		this.name = name;
		this.uuid = uuid;
		this.inventory = [];
		this.socket = socket;
	}

	cleanup() {}
}

export type Player = InstanceType<typeof GamePlayer>;
