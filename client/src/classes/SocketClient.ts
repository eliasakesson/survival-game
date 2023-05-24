import { NavigateFunction } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

<<<<<<< HEAD
/*
export class SocketClient {
	private socket: Socket;
	private navigator: NavigateFunction;

	constructor(navigator: NavigateFunction) {
		this.socket = io("http://localhost:3001");
		this.navigator = navigator;

		this.socket.on("connect", () => {
			console.log(`Connected to server with id ${this.socket.id}`);
		});

		this.socket.on("onRoomJoined", (data: any) => {
			const { name, worldSettings } = data;
			console.log(`Joined room ${name} with world settings:`, worldSettings);
			this.navigator(`/game?${name}`);
		});
	}

	public SendMessage(message: string) {
		this.socket.emit("message", message);
	}

	public JoinRoom(roomName: string) {
		this.socket.emit("joinServer", roomName, (res: any) => {
			console.warn(res);
		});
	}

	public JoinRoom(roomName: string) {
		this.socket.emit("joinServer", roomName, (res: any) => {
			console.warn(res);
		});
	}
}

*/
=======
let socket: Socket;
let navigator: NavigateFunction;

socket = io("http://localhost:3001");

socket.on("connect", () => {
	console.log(`Connected to server with id ${socket.id}`);
});

socket.on("onRoomJoined", (data: any) => {
	const { name, worldSettings } = data;
	console.log(`Joined room ${name} with world settings:`, worldSettings);
	navigator(`/game?${name}`);
});

export function JoinRoom(navi: NavigateFunction, roomName: string) {
	navigator = navi;
	socket.emit("joinRoom", roomName);
}
>>>>>>> 3088ae8d3df3a442258be6b492a4b388c064adf3
