import { Socket } from "socket.io-client";

export class Game {
	gameContext: any;
	socket: Socket;

	constructor(gameContext: any, socket: Socket) {
		this.gameContext = gameContext;
		this.socket = socket;
	}
}

export type GameType = InstanceType<typeof Game>;
